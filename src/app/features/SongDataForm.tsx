import { ChangeEvent } from "react";
import { Form, FormikProps } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  chakra,
  VStack,
  Textarea,
  Button,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { InitialValues1 } from "../types/home";

const ChakraForm = chakra(Form);
const genres = [
  { label: "Pop", value: "pop" },
  { label: "R&B", value: "r&b" },
  { label: "Rock", value: "rock" },
  { label: "EDM", value: "edm" },
  { label: "Anime OST", value: "anime ost" },
];

export default function SongDataForm({
  values,
  setFieldValue,
  errors,
}: FormikProps<InitialValues1>) {
  function onChange<
    T extends HTMLTextAreaElement & HTMLSelectElement & HTMLInputElement,
  >(e: ChangeEvent<T>) {
    setFieldValue(e.currentTarget.name, e.currentTarget.value);
  }

  return (
    <ChakraForm px={6}>
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>SONG TITLE</FormLabel>
          <Input
            name="title"
            border="1px solid black"
            value={values.title}
            onChange={onChange}
          />
          <FormHelperText>Enter the song&apos;s title</FormHelperText>
          <FormErrorMessage>{errors.title}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.prompt}>
          <FormLabel>GENRE</FormLabel>
          <Select
            placeholder="Select genre"
            name="genre"
            value={values.genre}
            onChange={onChange}
            border="1px solid black"
          >
            {genres.map(({ label, value }) => (
              <chakra.option key={value} value={label}>
                {label}
              </chakra.option>
            ))}
          </Select>
          <FormHelperText>Enter the genre of your song</FormHelperText>
          <FormErrorMessage>{errors.genre}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.prompt}>
          <FormLabel>THEME</FormLabel>
          <Textarea
            name="prompt"
            placeholder="Describe what is your song about"
            value={values.prompt}
            onChange={onChange}
            border="1px solid black"
          />
          <FormHelperText>Enter the prompt of your song</FormHelperText>
          <FormErrorMessage>{errors.prompt}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal">
          SAVE
        </Button>
      </VStack>
    </ChakraForm>
  );
}
