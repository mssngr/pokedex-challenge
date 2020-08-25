import { ApolloServer, gql, IResolvers } from 'apollo-server'
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import filter from 'lodash/filter'
import pokemon from './pokemon.json'
import Fuse from "fuse.js"

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

// fuzzy search library (Fuse.js) comes into play here
const options = {
  keys: ['name'],
  distance: 100,
  threshold: 0.5,
  location: 0
}
const pokemonArray = Object.values(pokemon)
const fuse = new Fuse( pokemonArray, options )
// const result = fuse.search('name')

const SearchByWeaknessesFilter = (SearchByWeaknesses: any, currentPokemon: any) => {
  return SearchByWeaknesses.every((currentValue: string) => currentPokemon.weaknesses.includes(currentValue));
}

const SearchByTypesFilter = (SearchByTypes: any, currentPokemon: any) => {
  return SearchByTypes.every((currentValue: string) => currentPokemon.types.includes(currentValue));
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
    pokemonMany(skip: Int, limit: Int, SearchByWeaknesses: [String], SearchByTypes: [String] ): [Pokemon!]!
    pokemonOne(id: ID!): Pokemon
    pokemonSearch(name: String!): [Pokemon!]!
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
    pokemonMany(
      _,
      { skip = 0, limit = 999, SearchByWeaknesses, SearchByTypes } : { skip?: number; limit?: number, SearchByWeaknesses?: string[], SearchByTypes?: string[] }
    ): Pokemon[] | undefined {
          if (SearchByWeaknesses === undefined && SearchByTypes === undefined) {
          return sortBy(pokemon, poke => parseInt(poke.id, 10)).slice(skip, limit + skip)
        } 
        
        else if (SearchByWeaknesses?.length !== 0 && SearchByTypes?.length !== 0) {
          return filter(pokemon, currentPokemon => SearchByWeaknessesFilter(SearchByWeaknesses, currentPokemon) && SearchByTypesFilter(SearchByTypes, currentPokemon))
        } 
    },
    pokemonOne(_, { id }: { id: string }): Pokemon {
      return (pokemon as Record<string, Pokemon>)[id]
    },
    pokemonSearch( _, { name } : { name: string }) : Pokemon[] {
      return fuse.search(name).map(object => object.item)}
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
