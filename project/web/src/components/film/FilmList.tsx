import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { Waypoint } from 'react-waypoint'
import { useFilmsQuery } from '../../generated/graphql'
import FilmCard from './FilmCard'

export default function FilmList() {
  const LIMIT = 6
  const { data, loading, error, fetchMore } = useFilmsQuery({
    variables: {
      limit: LIMIT,
      cursor: 1,
    },
  })

  if (error) return <p>{error.message}</p>

  function onEnter() {
    if (!data) return

    fetchMore({
      variables: {
        limit: LIMIT,
        cursor: data.films.cursor,
      },
    })
  }

  return (
    <SimpleGrid columns={[2, null, 3]} spacing={[2, null, 10]}>
      {loading && new Array(6).fill(0).map((x) => <Skeleton key={x} height="400px" />)}
      {!loading &&
        data &&
        data.films.films.map((film, i) => (
          <Box key={film.id}>
            {data.films.cursor && i === data.films.films.length - LIMIT / 2 && (
              <Waypoint onEnter={onEnter} />
            )}
            <FilmCard film={film} />
          </Box>
        ))}
    </SimpleGrid>
  )
}
