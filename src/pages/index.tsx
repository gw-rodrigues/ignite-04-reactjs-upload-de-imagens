import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsRequestedProps {
  after: string;
  data: Card[];
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // resquest the api and return page
    ({ pageParam = null }): Promise<CardsRequestedProps> => {
      const page = api
        .get(`/api/images${pageParam ? `?after=${pageParam}` : ''}`)
        .then(res => res.data);
      return page;
    },
    // get the returned page and return next page."after" with value of id or null
    {
      getNextPageParam: lastPage => lastPage.after,
    }
  );

  const formattedData = useMemo((): Card[] => {
    // TODO FORMAT AND FLAT DATA ARRAY
    const cards = data?.pages.map(({ data: card }) => card).flat();
    return cards;
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />;
  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />;

  return (
    <>
      <Header />
      <Box maxW={1120} px={{ base: 8, md: 20 }} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {
          /* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */
          hasNextPage && (
            <Box my="10">
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
              </Button>
            </Box>
          )
        }
      </Box>
    </>
  );
}
