import React from "react";
import { Button } from "@mantine/core";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for does not exist.
      </p>
      <Button size="lg" variant="outline" color="blue">
        Go Back
      </Button>
    </div>
  );
}

export default NotFound;
