"use client";

import {
  Box,
  Container,
  Group,
  Button,
  Text,
  Menu,
  Avatar,
  Burger,
  Drawer,
} from "@mantine/core";
import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/store/authStore";
import { clearSession } from "@/utils/auth";

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { session } = useSessionStore(); // Get the session from the store
  const router = useRouter();

  const toggleDrawer = () => setDrawerOpened((prev) => !prev);

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  return (
    <Box component="nav" className="bg-blue-500 shadow-md sticky top-0 z-10">
      <Container size="xl" className="py-4 flex justify-between items-center">
        <Group className="w-full">
          <div className="flex items-center space-x-2">
            <FiLink size={24} color="white" />
            <Text size="lg" className="text-white">
              Minim-URL
            </Text>
          </div>

          {session && (
            <div className="hidden md:flex mr-auto md:ml-10 space-x-6">
              <Button
                variant="light"
                color="white"
                className="text-white"
                onClick={() => router.push("/")}
              >
                Home
              </Button>
              <Button
                variant="light"
                color="white"
                className="text-white"
                onClick={() => router.push("/pages/links")}
              >
                Links
              </Button>
            </div>
          )}

          <Group className="md:ml-auto md:block hidden">
            {session ? (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Avatar
                    radius="xl"
                    src={""}
                    alt="Profile"
                    className="cursor-pointer bg-white"
                  />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>Account</Menu.Label>
                  <Menu.Item
                    onClick={clearSession}
                    className="text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            ) : (
              <Button
                variant="filled"
                color="white"
                onClick={handleLoginClick}
                className="text-black"
              >
                Login
              </Button>
            )}
          </Group>

          {/* Burger Menu for Mobile */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="white"
            size={30}
            className="md:hidden ml-auto"
          />
        </Group>
      </Container>

      {/* Mobile Drawer for Navigation */}
      <Drawer
        opened={drawerOpened}
        onClose={toggleDrawer}
        position="right"
        padding="lg"
        size="xs"
        title="Menu"
      >
        {session ? (
          <div className="flex flex-col gap-4">
            <Button
              variant="light"
              color="blue"
              onClick={() => {
                router.push("/");
                setDrawerOpened(false);
              }}
            >
              Home
            </Button>
            <Button
              variant="light"
              color="blue"
              onClick={() => {
                router.push("/pages/links");
                setDrawerOpened(false);
              }}
            >
              Links
            </Button>
            <Button variant="filled" color="blue" onClick={clearSession}>
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="filled"
            color="blue"
            onClick={() => {
              router.push("/auth/login");
              setDrawerOpened(false);
            }}
          >
            Login
          </Button>
        )}
      </Drawer>
    </Box>
  );
}
