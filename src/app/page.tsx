"use client";
import { BiCopy } from "react-icons/bi";
import React, { useState } from "react";
import { TextInput, Button, Container, Text, Box, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLinkStore } from "@/store/linkStore";
import { notifications } from "@mantine/notifications";
import { useSessionStore } from "@/store/authStore";

const ShortenerPage = () => {
  const { addLinkToStore } = useLinkStore();
  const [shortenedURL, setShortenedURL] = useState("");
  const { session } = useSessionStore();

  const form = useForm({
    initialValues: {
      original_url: "",
      short_url: "",
    },

    validate: {
      original_url: (value) =>
        /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(value)
          ? null
          : "Invalid URL, use https:// method",
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
      user_id: session?.user?.id,
    };

    await addLinkToStore(newLink);
    setShortenedURL(`${window.location.origin}/${short_url}`);
    form.setFieldValue("short_url", short_url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedURL);
    notifications.show({
      title: "Copied",
      message: "URL copied to clipboard",
      color: "blue",
    });
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

          <Button type="submit">Shorten</Button>
          <Button type="submit" onClick={form.reset} variant="light" ml="sm">
            Reset{" "}
          </Button>
        </form>

        {form.errors.original_url && (
          <Alert title="Error" color="red" mt="md">
            {form.errors.original_url}
          </Alert>
        )}

        {form.values.short_url && (
          <Text size="sm" mt="md">
            Your URL:{" "}
            <span className="text-blue-600 underline">
              {form.values.original_url}{" "}
            </span>
            has been shortened to:
            <span className="text-blue-600 underline ml-2">{shortenedURL}</span>
            <span
              className="mx-auto flex items-center justify-center mt-2 cursor-pointer"
              onClick={handleCopy}
            >
              <BiCopy className=" text-lg text-gray-700 mr-2" />
              copy short URL
            </span>
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default ShortenerPage;
