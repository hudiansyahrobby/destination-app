import { chakra } from "@chakra-ui/react";
import React from "react";
import { HiAcademicCap } from "react-icons/hi";
import { Link } from "react-router-dom";
import Title from "./typography/Title";

interface LogoProps {
  title: string;
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  const LogoLink = chakra(Link);
  const LogoIcon = chakra(HiAcademicCap);
  return (
    <Title>
      <LogoLink to="/" display={{ base: "none", lg: "block" }}>
        {title}
      </LogoLink>
      <LogoIcon display={{ lg: "none" }} color="green.500" />
    </Title>
  );
};

export default Logo;
