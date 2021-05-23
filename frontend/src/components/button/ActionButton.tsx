import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import AlertDialogBox from "../AlertDialog";

interface ActionButtonProps {
  id: number;
  link: string;
  onDelete: (id: number) => Promise<void>;
  isDeleteLoading: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { id, link } = props;
  return (
    <Flex>
      <Button
        as={Link}
        leftIcon={<MdDelete />}
        colorScheme="yellow"
        variant="solid"
        mr={2}
        to={`/admin/${link}/edit/${id}?editMode=true`}
      >
        Edit
      </Button>
      <AlertDialogBox {...props} />
    </Flex>
  );
};

export default ActionButton;
