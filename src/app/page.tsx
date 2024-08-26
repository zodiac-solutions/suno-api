"use client";
import qrCode from "qrcode";
import axios from "axios";
import { Formik } from "formik";
import { string, object } from "yup";
import { useMemo, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  AspectRatio,
  Button,
} from "@chakra-ui/react";
import SongDataForm from "./features/SongDataForm";
import ContactDataForm from "./features/ContactDataForm";
import { supabase } from "@/lib/supabase";
import { InitialValues1, InitialValues2, CreatedSong } from "./types/home";
import { useUserStore } from "./states/home";
import { useLoadingStore } from "./states/loading";

const requiredString = string().required("Required");
const strictRequiredString = requiredString.matches(
  /^[\w\s.,']+$/,
  "Contain illegal character(s)",
);

export default function Home() {
  const [step, setStep] = useState(0);
  const [urls, setUrls] = useState({ qrCode: "", audio: "" });
  const songData = useUserStore((state) => ({
    title: state.title,
    genre: state.genre,
    prompt: state.prompt,
  }));
  const setSongData = useUserStore((state) => state.setSongData);
  const setLoading = useLoadingStore((state) => state.setLoading);
  const statePackages = useMemo(
    () => [
      {
        initialValues: { genre: "", prompt: "", title: "" } as InitialValues1,
        validationSchema: object().shape({
          title: strictRequiredString,
          genre: requiredString,
          prompt: strictRequiredString,
        }),
        onSubmit: (values: InitialValues1) => {
          setSongData(values);
          setStep(1);
        },
        component: SongDataForm,
      },
      {
        initialValues: { name: "", email: "" } as InitialValues2,
        validationSchema: object().shape({
          name: strictRequiredString,
          email: requiredString.email("Invalid email address"),
        }),
        onSubmit: async (values: InitialValues2) => {
          try {
            setLoading(true);
            const createdSong = await axios.post<CreatedSong[]>(
              "/api/generate",
              {
                prompt: `${songData.prompt} with title ${songData.title} and in genre ${songData.genre}`,
                make_instrumental: false,
                wait_audio: true,
              },
            );

            // Download the songs and upload them to Supabase
            const downloadedSongs = await Promise.all(
              createdSong.data.map(async ({ audio_url, id }) => {
                const response = await axios.get<Blob>(audio_url, {
                  responseType: "blob",
                });

                const { data, error } = await supabase.storage
                  .from("suno")
                  .upload(`songs/${id}.mp3`, response.data, {
                    cacheControl: "3600",
                    upsert: false,
                    contentType: "audio/mpeg",
                  });

                if (error) {
                  throw error;
                }

                return data.path;
              }),
            );

            const { error } = await supabase
              .from("suno")
              .insert(
                downloadedSongs.map((audioUrl) => ({
                  ...songData,
                  ...values,
                  audioUrl,
                })),
              )
              .select();

            if (error) {
              throw error;
            }

            setStep(2);
            const { data } = supabase.storage
              .from("suno")
              .getPublicUrl(downloadedSongs[0]);

            const generatedQrCode = await qrCode.toDataURL(data.publicUrl);
            setUrls({
              qrCode: generatedQrCode,
              audio: data.publicUrl,
            });
          } catch (error) {
          } finally {
            setLoading(false);
          }
        },
        component: ContactDataForm,
      },
    ],
    [setLoading, setSongData, songData],
  );

  return (
    <Center bg="pink">
      <Box as="main" py={8} bgColor="linen" h="100vh" w={(100 / 16) * 9 + "vh"}>
        <Heading textAlign="center" textTransform="uppercase" mb={8}>
          Make Your Own Song
        </Heading>
        {step < 2 ? (
          <Formik<InitialValues1 | InitialValues2>
            enableReinitialize
            initialValues={statePackages[step].initialValues}
            validationSchema={statePackages[step].validationSchema}
            // @ts-ignore
            onSubmit={statePackages[step].onSubmit}
            // @ts-ignore
            component={statePackages[step].component}
          />
        ) : (
          <Box px={6}>
            <AspectRatio ratio={1} maxW="25rem" mx="auto" mb={6}>
              <Image alt={urls.audio} src={urls.qrCode} />
            </AspectRatio>
            <Center>
              <Button onClick={() => setStep(0)}>BACK</Button>
            </Center>
          </Box>
        )}
      </Box>
    </Center>
  );
}
