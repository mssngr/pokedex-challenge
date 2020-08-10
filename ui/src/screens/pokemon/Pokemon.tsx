import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import PokemonList from '../../components/PokemonList'


const POKEMON_MANY = gql`
  query($skip: Int, $limit: Int) {
    pokemonMany(skip: $skip, limit: $limit) {
      id
      name
      num
      img
    }
  }
`

const POKEMON_SEARCH_BY_NAME = gql`
  query($searchValue: String) {
    pokemonFilterByName(name: $searchValue) {
      id
      name
      num
      img
    }
  }
`

const POKEMON_FILTER_BY_TYPES_AND_WEAKNESSES = gql`
  query($searchValue: [String]) {
    pokemonMany(filterValues: $searchValue) {
       id
       name
       num
       img
     }
   }  
`


const PokemonMany: React.FC<{clickLink: Function}> = ({
  clickLink
}) => {

  //all Pokemon
  const { loading, error, data } = useQuery(POKEMON_MANY)
  
  const pokemonList:
    | Array<{ id: string; name: string; img: string; num: string }>
    | undefined = data?.pokemonMany
  
  return (
    <PokemonList 
    clickLink={clickLink}
    pokemonList={pokemonList}
    loading={loading}
    error={error}
    />
  )
}

const PokemonSearch: React.FC<{clickLink: Function, searchValue: any}> = ({
  clickLink,
  searchValue
}) => {

    //search by name
    const { loading, error, data } = useQuery(POKEMON_SEARCH_BY_NAME, {variables: {searchValue}})
  
  const pokemonList:
    | Array<{ id: string; name: string; img: string; num: string }>
    | undefined = data?.pokemonFilterByName
    
    return (
      <PokemonList 
      clickLink={clickLink}
      pokemonList={pokemonList}
      loading={loading}
      error={error}
      />
    )
  
}

const PokemonFilter: React.FC<{clickLink: Function, searchValue: any}> = ({
  clickLink,
  searchValue
}) => {

  //filter by types & weaknesses
  const { loading, error, data } = useQuery(POKEMON_FILTER_BY_TYPES_AND_WEAKNESSES, {variables: {searchValue}})
  
      const pokemonList:
        | Array<{ id: string; name: string; img: string; num: string }>
        | undefined = data?.pokemonMany
        
        return (
          <PokemonList 
          clickLink={clickLink}
          pokemonList={pokemonList}
          loading={loading}
          error={error}
          />          
        )
}

  const Pokemon: React.FC<RouteComponentProps & { clickLink: Function}> = ({
    clickLink,
    location
  }) => {

  const {searchValue} = location?.state as any;

  if (searchValue === "All") {
    return <PokemonMany clickLink={clickLink} />;
  } else if (typeof searchValue === "string") {
    return <PokemonSearch clickLink={clickLink} searchValue={searchValue} />;
  } else {
    return <PokemonFilter clickLink={clickLink} searchValue={searchValue} />;
  }

}

export default Pokemon
