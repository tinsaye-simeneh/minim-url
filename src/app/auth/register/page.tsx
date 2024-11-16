"use client";

import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";

const RegisterPage = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome to Minim-URL!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <Anchor size="sm" component="button">
          Login
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Name" placeholder="Your name" required />
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />

        <Button fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
