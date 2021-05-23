import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";

interface AlertMessageProps {
  status: "error" | "info" | "warning" | "success" | undefined;
  title: string;
  description: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  status,
  title,
  description,
}) => {
  return (
    <Alert status={status} my={4}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  );
};

export default AlertMessage;
