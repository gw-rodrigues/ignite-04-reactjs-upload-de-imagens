import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        w="auto"
        maxW={900}
        h="auto"
        mx={{ sm: 12, md: 'auto' }}
        my="auto"
      >
        <ModalBody padding={0}>
          <Image src={imgUrl} width="auto" height="auto" maxH={600} />
        </ModalBody>
        <ModalFooter
          backgroundColor="pGray.800"
          justifyContent="flex-start"
          roundedBottom={6}
        >
          <Link
            href={imgUrl}
            isExternal
            color="pGray.50"
            fontSize="sm"
            lineHeight={4}
            fontWeight="normal"
            _focus={{
              outline: 'none',
            }}
            transition="filter .2s"
            _hover={{ filter: 'brightness(0.7)' }}
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
