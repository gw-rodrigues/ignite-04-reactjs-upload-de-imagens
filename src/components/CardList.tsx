import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure();

  // TODO SELECTED IMAGE URL STATE
  const [imageURL, setImageUR] = useState('');

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(url: string): void {
    setImageUR(url);
    onOpen();
  }
  return (
    <>
      <SimpleGrid w="100%" columns={[1, null, 2, 3]} spacing="40px">
        {
          /* TODO CARD GRID */
          cards.map(card => (
            // eslint-disable-next-line react/jsx-no-bind
            <Card key={card.id} data={card} viewImage={handleViewImage} />
          ))
        }
      </SimpleGrid>

      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageURL} />
    </>
  );
}
