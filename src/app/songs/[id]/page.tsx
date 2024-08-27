"use client";
import { supabase } from "@/lib/supabase";
import { Center, Box, Heading, VStack, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface PageParams {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageParams) {
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    const { data } = supabase.storage
      .from("suno")
      .getPublicUrl("songs/" + params.id);

    setDownloadUrl(data.publicUrl);
  }, [params.id]);

  return (
    <Center bg="pink">
      <Box as="main" py={8} bgColor="linen" h="100vh" w={(100 / 16) * 9 + "vh"}>
        <Heading textAlign="center" textTransform="uppercase" mb={8}>
          Make Your Own Song
        </Heading>
        <VStack as="figure" spacing={4}>
          <Text as="figcaption">Listen to your song:</Text>
          <audio
            controls
            controlsList="nodownload"
            src={downloadUrl}
            preload="auto"
          />
          <Link href={downloadUrl} isExternal download={`song-${params.id}`}>
            Download
          </Link>
        </VStack>
      </Box>
    </Center>
  );
}
