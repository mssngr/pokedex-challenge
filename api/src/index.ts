//Apollo
import { ApolloServer, gql, IResolvers } from 'apollo-server'

//Data
import pokemon from './pokemon.json'

//External Utils
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import filter from 'lodash/filter'

//Internal Utils
import {firstSyllableCheck} from './utils/utils';

interface Pokemon {
  id: string
  num: string
  name: string
  img: string
  types: string[]
  weaknesses: string[]
  height: string
  weight: string
  egg: string
  prevEvolutions?: Array<{ num: string; name: string }>
  nextEvolutions?: Array<{ num: string; name: string }>
  candy?: string
  candyCount?: number
}

const typeDefs = gql`
  type Pokemon {
    id: ID!
    num: ID!
    name: String!
    img: String!
    types: [String!]!
    weaknesses: [String!]!
    height: String!
    weight: String!
    egg: String!
    prevEvolutions: [Pokemon!]!
    nextEvolutions: [Pokemon!]!
    candy: String
    candyCount: Int
  }

  type Query {   
    pokemonFilterByName(name: String): [Pokemon!]!
    pokemonMany(skip: Int, limit: Int, filterValues: [String]): [Pokemon!]!
    pokemonOne(id: ID!): Pokemon
  }
`

const resolvers: IResolvers<any, any> = {
  Pokemon: {
    prevEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.prevEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
    nextEvolutions(rawPokemon: Pokemon) {
      return (
        rawPokemon.nextEvolutions?.map(evolution =>
          find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
        ) || []
      )
    },
  },
  Query: {
    pokemonFilterByName(_, { name }: { name: string }): Pokemon[] {
      return filter(pokemon, currentPokemon => firstSyllableCheck(name, currentPokemon.name));
    },
    pokemonMany(
      _,
      { skip = 0, limit = 999, filterValues }: { skip?: number; limit?: number; filterValues?: string[] }
    ): Pokemon[] 
    {

        if (filterValues === undefined) {
        return sortBy(pokemon, poke => parseInt(poke.id, 10)).slice(
          skip,
          limit + skip
        )
      } else {
        return filter(pokemon, currentPokemon => {
          let typesWeaknessCombinedArr = [...currentPokemon.types, ...currentPokemon.weaknesses]; 
          
          const isContainedInTypesOrWeaknesses = (filterValue: string) => typesWeaknessCombinedArr.includes(filterValue);
          
          return filterValues.every(isContainedInTypesOrWeaknesses);  
        })
      }
    },
    pokemonOne(_, { id }: { id: string }): Pokemon {
      return (pokemon as Record<string, Pokemon>)[id]
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
