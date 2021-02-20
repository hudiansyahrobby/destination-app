import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Paragraph from "../typography/Paragraph";

interface Item {
  name: string;
  content: string;
  icon: any;
}
interface TabItemsProps {
  items: Array<Item>;
}

const TabItems: React.FC<TabItemsProps> = ({ items }) => {
  return (
    <Tabs isFitted variant="enclosed" isLazy>
      <TabList mb="1em">
        {items.map(({ name, icon }) => {
          return (
            <Tab icon _selected={{ color: "teal", outlineColor: "teal" }}>
              {icon}
              <Text ml="4px">{name}</Text>
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {items.map(({ content }) => {
          return (
            <TabPanel>
              <Paragraph>{content}</Paragraph>
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default TabItems;
