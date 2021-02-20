import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface TextWithIconProps {
  icon: any;
  children: React.ReactNode;
  text: string;
}

const TextWithIcon: React.FC<TextWithIconProps> = ({
  icon: Icon,
  children,
  text,
}) => {
  return (
    <Flex alignItems="center">
      <Icon display="inline-block" fontSize={30} mr="8px" />{" "}
      <Text as="span" mr={2}>
        {text} :
      </Text>{" "}
      {children}
    </Flex>
  );
};

export default TextWithIcon;
