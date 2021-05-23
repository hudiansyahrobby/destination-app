import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AlertDialog } from "@chakra-ui/modal";
import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import { MdDelete } from "react-icons/md";

interface AlertDialogBoxProps {
  id: number;
  link: string;
  onDelete: (id: number) => Promise<void>;
  isDeleteLoading: boolean;
}

const AlertDialogBox: React.FC<AlertDialogBoxProps> = ({
  onDelete,
  isDeleteLoading,
  id,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  return (
    <>
      <Button
        leftIcon={<MdDelete />}
        colorScheme="red"
        variant="solid"
        onClick={onOpen}
        minWidth="28"
      >
        Delete
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete Item</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                onDelete(id);
                onClose();
              }}
              isLoading={isDeleteLoading}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogBox;
