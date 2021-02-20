import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Comment from "../comment/Comment";
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
  const comments = [
    {
      name: "Dan Abramov",
      avatar: "https://bit.ly/dan-abramov",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sit ullam a accusamus tempora tenetur harum optio vitae quasi praesentium.",
      date: "18 Januari 2020",
    },
  ];
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
        <TabPanel>
          <Paragraph>{items[0].content}</Paragraph>
        </TabPanel>
        <TabPanel>
          <Comment comments={comments} />
        </TabPanel>
        <TabPanel>
          <Paragraph>{items[2].content}</Paragraph>
        </TabPanel>
        {/* {items.map(({ content }) => {
          return (
            <TabPanel>
              <Paragraph>{content}</Paragraph>
            </TabPanel>
          );
        })} */}
      </TabPanels>
    </Tabs>
  );
};

export default TabItems;
