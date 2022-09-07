import { Box, Flex, Button, useDisclosure, Image } from '@chakra-ui/react';

import { ModalAddImage } from './Modal/AddImage';

export function Header(): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bgColor="pGray.800">
        <Flex
          justifyContent={{ base: 'center', sm: 'space-between' }}
          alignItems="center"
          maxW={1120}
          mx="auto"
          px={{ base: 6, sm: 20 }}
          py={6}
          wrap="wrap"
        >
          <Image src="logo.svg" h={10} m={{ base: 6, sm: 0 }} />
          <Button onClick={() => onOpen()}>Adicionar imagem</Button>
        </Flex>
      </Box>

      <ModalAddImage isOpen={isOpen} onClose={onClose} />
    </>
  );
}
