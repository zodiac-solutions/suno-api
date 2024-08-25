import { ChangeEvent } from "react";
import { Form, FormikProps } from "formik";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  chakra,
  VStack,
  Button,
  FormErrorMessage,
  Input,
  Text,
} from "@chakra-ui/react";
import { InitialValues2 } from "../types/home";
import { useLoadingStore } from "../states/loading";

const ChakraForm = chakra(Form);

export default function ContactDataForm({
  values,
  setFieldValue,
  errors,
}: FormikProps<InitialValues2>) {
  const isLoading = useLoadingStore((state) => state.isLoading);
  function onChange<T extends HTMLInputElement>(e: ChangeEvent<T>) {
    setFieldValue(e.currentTarget.name, e.currentTarget.value);
  }

  return (
    <ChakraForm px={6}>
      <VStack spacing={6}>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>NAME</FormLabel>
          <Input
            name="name"
            border="1px solid black"
            value={values.name}
            onChange={onChange}
            isDisabled={isLoading}
          />
          <FormHelperText>Enter your name</FormHelperText>
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>EMAIL</FormLabel>
          <Input
            border="1px solid black"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            isDisabled={isLoading}
          />
          <FormHelperText>Enter your email</FormHelperText>
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="teal" isLoading={isLoading}>
          SAVE
        </Button>
        <Text>This will take a while</Text>
      </VStack>
    </ChakraForm>
  );
}
