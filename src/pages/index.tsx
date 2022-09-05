import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import React from 'react';
import { number } from 'yup/lib/locale';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface requestedImagesParams {
  after: string;
  data: {
    title: string;
    description: string;
    url: string;
  }[];
}
export default function Home(): JSX.Element {
  const getPageParam = async ({
    pageParam = 1,
  }): Promise<requestedImagesParams> => {
    const page = await fetch(`/api/images/?after=${pageParam}`).then(response =>
      response.json()
    );
    return page;
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // resquest the api and return page
    getPageParam,
    // get the returned page and return next page."after" with value of id or null
    {
      getNextPageParam: page => page.after,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(({ data: page }) => page.flat());
  }, [data]);

  // TODO RENDER LOADING SCREEN
  if (isLoading) return <Loading />;
  // TODO RENDER ERROR SCREEN
  if (isError) return <Error />;

  return (
    <>
      <Header />
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}
