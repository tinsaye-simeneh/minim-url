"use client";

import { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Container,
  Title,
  Paper,
} from "@mantine/core";

export default function ShortenUrlPage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShortenUrl = () => {
    if (!originalUrl) return;
    else {
      setShortUrl(`https://minim-url.vercel.app/${originalUrl}`);
    }
  };

  return (
    <Container size="xs" className="my-10">
      <Paper p="lg" shadow="xs" className="space-y-6">
        <Title order={2} className="text-xl">
          URL Shortener
        </Title>

        <TextInput
          label="Original URL"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(event) => setOriginalUrl(event.target.value)}
          classNames={{ input: "border-2" }}
        />

        <Group>
          <Button onClick={handleShortenUrl} color="blue" className="w-full">
            Shorten URL
          </Button>
        </Group>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">Your Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </Paper>
    </Container>
  );
}
