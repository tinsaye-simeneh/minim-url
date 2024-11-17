import {
  Container,
  Group,
  Button,
  Text,
  Burger,
  Drawer,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { FiLink } from "react-icons/fi";

export default function Navbar() {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => setDrawerOpened((prev) => !prev);

  return (
    <div className="bg-blue-500 shadow-md">
      <Container size="xl" className="py-4 flex justify-between items-center">
        <Group className="w-full">
          <div className="flex items-center space-x-2">
            <FiLink size={24} color="white" />
            <Text color="white" size="lg">
              Minim-URL
            </Text>
          </div>
          <div className="hidden md:flex space-x-6">
            <Button variant="light" color="white" className="text-white">
              Home
            </Button>
            <Button variant="light" color="white" className="text-white">
              About
            </Button>
            <Button variant="light" color="white" className="text-white">
              Contact
            </Button>
          </div>
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            color="white"
            size={30}
            className="md:hidden"
          />
        </Group>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={toggleDrawer}
        position="right"
        padding="lg"
        size="xs"
        title="Menu"
      >
        <Stack gap="xs">
          <Button variant="light" color="blue" onClick={toggleDrawer}>
            Home
          </Button>
          <Button variant="light" color="blue" onClick={toggleDrawer}>
            About
          </Button>
          <Button variant="light" color="blue" onClick={toggleDrawer}>
            Contact
          </Button>
        </Stack>
      </Drawer>
    </div>
  );
}
