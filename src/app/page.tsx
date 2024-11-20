"use client";
import { BiCopy } from "react-icons/bi";
import React, { useState } from "react";
import { TextInput, Button, Container, Text, Box, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLinkStore } from "@/store/linkStore";

const ShortenerPage = () => {
  const { addLinkToStore } = useLinkStore();
  const [shortenedURL, setShortenedURL] = useState("");
  const UserId = "cb3e15cd-e8eb-4a42-b39a-f10a5519c948";

  const form = useForm({
    initialValues: {
      original_url: "",
      short_url: "",
    },

    validate: {
      original_url: (value) =>
        /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value) ? null : "Invalid URL",
    },
  });

  const generateshort_url = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  //   eslint-disable-next-line
  const handleShorten = async (values: any) => {
    const short_url = generateshort_url();

    const newLink = {
      original_url: values.original_url,
      short_url,
      user_id: UserId,
    };

    await addLinkToStore(newLink);
    setShortenedURL(`${window.location.origin}/${short_url}`);
    form.reset();
    form.setFieldValue("short_url", short_url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedURL);
    alert("Copied to clipboard!");
  };

  return (
    <Container
      style={{
        height: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box className="w-[500px] p-5 rounded-lg shadow-lg text-center border border-gray-200">
        <Text size="xl" mb="sm">
          URL Shortener
        </Text>
        <Text size="sm" mb="lg">
          Paste your untidy link to shorten it
        </Text>

        <form onSubmit={form.onSubmit(handleShorten)}>
          <TextInput
            placeholder="Enter your URL"
            {...form.getInputProps("original_url")}
            mb="md"
          />

          <Button fullWidth type="submit">
            Shorten
          </Button>
        </form>

        {form.errors.original_url && (
          <Alert title="Error" color="red" mt="md">
            {form.errors.original_url}
          </Alert>
        )}

        {form.values.short_url && (
          <Text size="sm" mt="md">
            Your shortened URL:
            <span className="text-blue-600 underline">{shortenedURL}</span>
            <span
              className="mx-auto flex items-center justify-center mt-2 cursor-pointer"
              onClick={handleCopy}
            >
              <BiCopy className=" text-lg text-gray-700 mr-2" />
              copy
            </span>
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default ShortenerPage;
