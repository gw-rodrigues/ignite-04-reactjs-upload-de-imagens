import {
  Box,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
}

export function Card({ data, viewImage }: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen: isHover, onOpen, onClose } = useDisclosure();

  return (
    <Box
      key={data.ts}
      borderRadius="md"
      bgColor="pGray.800"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      filter={isHover ? 'contrast(115%)' : 'none'}
      transition="filter .3s"
    >
      <Skeleton isLoaded={!isLoading}>
        <Flex h={48} overflow="hidden" borderTopRadius="md">
          <Image
            src={data.url}
            alt={data.title}
            objectFit="cover"
            w="100%"
            h="auto"
            minH={48}
            onClick={() => viewImage(data.url)}
            onLoad={() => setIsLoading(false)}
            cursor="pointer"
            transition="transform .3s"
            transform={isHover ? 'scale(1.2)' : 'none'}
          />
        </Flex>
      </Skeleton>

      <Box pt={5} pb={4} px={6}>
        {isLoading ? (
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
        ) : (
          <>
            <Heading fontSize="2xl">{data.title}</Heading>
            <Text mt={2.5} fontSize="md">
              {data.description}
            </Text>
          </>
        )}
      </Box>
    </Box>
  );
}
