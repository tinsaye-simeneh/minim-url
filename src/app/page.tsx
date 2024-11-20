"use client";
import { supabase } from "../utils/supabaseClient";
import React, { useState } from "react";
import { TextInput, Button, Container, Text, Box, Center } from "@mantine/core";
import { useLinkStore } from "@/store/linkStore";

const ShortenerPage = () => {
  const { originalUrl, setOriginalUrl, shortUrl, setShortUrl } = useLinkStore();
  const [loading, setLoading] = useState(false);

  const shortenUrl = async () => {
    if (!originalUrl) return;
    setLoading(true);

    try {
      const randomString = Math.random().toString(36).substring(2, 8);
      const shortUrl = `briefly.link/${randomString}`;

      // Save to Supabase
      const { data, error } = await supabase
        .from("urls")
        .insert([{ original_url: originalUrl, shortened_url: shortUrl }]);

      if (error) throw error;
      setShortUrl(shortUrl);
    } catch (error) {
      console.error("Error shortening URL:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 20,
          borderRadius: 10,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Text size="xl" weight={700} mb="sm">
          URL Shortener
        </Text>
        <Text size="sm" color="dimmed" mb="lg">
          Paste your untidy link to shorten it
        </Text>
        <TextInput
          placeholder="Enter your URL"
          value={originalUrl}
          onChange={(e) => setOrginalUrl(e.target.value)}
          mb="md"
        />
        <Button fullWidth onClick={shortenUrl} loading={loading}>
          Shorten
        </Button>
        {shortUrl && (
          <Text size="sm" mt="md" color="teal">
            Your shortened URL:{" "}
            <a
              href={`https://${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default ShortenerPage;
