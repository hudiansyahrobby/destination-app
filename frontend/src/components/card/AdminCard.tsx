import Icon from "@chakra-ui/icon";
import { Box } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React from "react";
import { Link } from "react-router-dom";
import Title from "../typography/Title";

interface AdminCardProps {
  icon: any;
  title: string;
  to: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ icon, title, to }) => {
  const CardLink = chakra(Link);
  return (
    <Box
      as={CardLink}
      to={to}
      height="100px"
      bgColor="green.100"
      p="4"
      display="flex"
      alignItems="center"
      borderRadius="lg"
    >
      <Box
        bgColor="green.200"
        p="3"
        height="10"
        width="10"
        borderRadius="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mr="4"
      >
        <Icon as={icon} color="green.500" fontSize="2xl" />
      </Box>
      <Title>{title}</Title>
    </Box>
  );
};

export default AdminCard;
