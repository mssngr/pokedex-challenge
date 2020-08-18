//apollo
import { ApolloServer, gql, IResolvers } from 'apollo-server'

//data
import pokemon from './pokemon.json'

//prepare data for fuse
const pokemonArrayOfObjects = Object.values(pokemon)

//external utils
import sortBy from 'lodash/sortBy'
import find from 'lodash/find'
import filter from 'lodash/filter'

//internal utils
import {typeFilterValuesCheck} from './utils/typeFilter'
import {weaknessFilterValuesCheck} from './utils/weaknessFilter'

//fuzzy search set up
//Review note: Chose fuse.js as external tool to implement fuzzy search for following reasons:
// 1.  Given the scale of the current app, this library is sufficiently powerful:
//     a. there are multiple options for further configuration such as:
//         i. case sensitivity
//         ii. sorting by liklihood of match
//         iii. pattern location
//         iv. threshhold to meet for match score
//     b. as measured by the features dictated in the prompt
// 2. In addition, it has zero dependencies, which reduces developer time in updating said potential dependencies with other libraries
// 3. It passes all use cases provided (as well as other logical ones)
//Please see further notes / user story / acceptance criteria in README
import Fuse from 'fuse.js'
const options: any = {
  keys: ["name"]
}
const fuse = new Fuse(pokemonArrayOfObjects, options)


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
    pokemonMany(skip: Int, limit: Int, typeFilterValues: [String], weaknessFilterValues: [String]): [Pokemon!]!
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
    pokemonFilterByName(_, { name }: { name: string }): 
    Pokemon[] {
      return fuse.search(name).map(obj => obj.item);
    },
    pokemonMany(
      _,
      { skip = 0, limit = 999, typeFilterValues, weaknessFilterValues }: { skip?: number; limit?: number; typeFilterValues?: string[]; weaknessFilterValues?: string[] }
    ): 
    Pokemon[] | undefined
    {
      //no filters
        if (typeFilterValues === undefined && weaknessFilterValues === undefined) {
        return sortBy(pokemon, poke => parseInt(poke.id, 10)).slice(skip, limit + skip)
      } 
      //filter for both type and weakness
      else if (typeFilterValues?.length !== 0 && weaknessFilterValues?.length !== 0) {
        return filter(pokemon, currentPokemon => typeFilterValuesCheck(typeFilterValues, currentPokemon) && weaknessFilterValuesCheck(weaknessFilterValues, currentPokemon))
      } 
      //filter for types only
        else if (typeFilterValues?.length !== 0) {
        return filter(pokemon, currentPokemon => typeFilterValuesCheck(typeFilterValues, currentPokemon))
      } 
      // //filter for weaknesses only
        else if (weaknessFilterValues?.length !== 0) {
        return filter(pokemon, currentPokemon => weaknessFilterValuesCheck(weaknessFilterValues, currentPokemon))
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
