import { chakra } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import Title from "./typography/Title";

interface LogoProps {
  title: string;
}

const Logo: React.FC<LogoProps> = ({ title }) => {
  const LogoLink = chakra(Link);
  const LogoIcon = chakra(MdMenu);
  return (
    <Title>
      <LogoLink to="/" display={{ base: "none", lg: "block" }}>
        {title}
      </LogoLink>
      <LogoIcon display={{ lg: "none" }} />
    </Title>
  );
};

export default Logo;
