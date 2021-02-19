import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import React from "react";
import { BsFilter } from "react-icons/bs";
const FilterButton: React.FC = () => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        colorScheme="whatsapp"
        rightIcon={<BsFilter size={23} />}
      >
        Filter
      </MenuButton>
      <MenuList minWidth="240px">
        <Box>
          <MenuOptionGroup defaultValue="asc" title="Order" type="radio">
            <MenuItemOption value="asc">Ascending</MenuItemOption>
            <MenuItemOption value="desc">Descending</MenuItemOption>
          </MenuOptionGroup>
        </Box>
        <MenuDivider />
        <Box>
          <MenuOptionGroup title="Option" type="radio" defaultValue="popular">
            <MenuItemOption value="popular">Most Popular</MenuItemOption>
            <MenuItemOption value="trending">Trending</MenuItemOption>
            <MenuItemOption value="visited">Most Visited</MenuItemOption>
          </MenuOptionGroup>
        </Box>
      </MenuList>
    </Menu>
  );
};
export default FilterButton;
