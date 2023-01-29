import { Arg, Field, Int, ObjectType, Query, Resolver, FieldResolver, Root } from 'type-graphql'
import ghibliData from '../data/ghibli'
import { Director } from '../entities/Director'
import { Film } from '../entities/Film'

@ObjectType()
class PaginatedFilms {
  @Field(() => [Film])
  films: Film[]

  @Field(() => Int, { nullable: true })
  cursor?: Film['id'] | null
}

@Resolver(Film)
export class FilmResolver {
  @Query(() => PaginatedFilms)
  films(
    @Arg('limit', () => Int, { nullable: true, defaultValue: 6 }) limit: number,
    @Arg('cursor', () => Int, { nullable: true, defaultValue: 1 }) cursor: Film['id'],
  ): PaginatedFilms {
    // 너무 많은 limit 값은 6으로 제한
    const realLimit = Math.min(6, limit)

    // 커서가 없는 경우 빈 배열 전송
    if (!cursor) return { films: [] }

    const cursorDataIndex = ghibliData.films.findIndex((f) => f.id === cursor)

    if (cursorDataIndex === -1) return { films: [] }

    const result = ghibliData.films.slice(cursorDataIndex, cursorDataIndex + realLimit)
    const nextCursor = result.at(-1).id + 1
    const hasNext = ghibliData.films.findIndex((f) => f.id === nextCursor) > -1

    return {
      cursor: hasNext ? nextCursor : null,
      films: result,
    }
  }

  @FieldResolver(() => Director)
  director(@Root() parentFilm: Film): Director | undefined {
    return ghibliData.directors.find((dr) => dr.id === parentFilm.director_id)
  }
}
