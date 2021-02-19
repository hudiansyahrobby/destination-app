import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchBar = () => {
  return (
    <InputGroup>
      <Input id="destinasi" placeholder="Cari Destinasi" />
      <InputRightElement children={<BiSearchAlt2 />} />
    </InputGroup>
  );
};

export default SearchBar;
