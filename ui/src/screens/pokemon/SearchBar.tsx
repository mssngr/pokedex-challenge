import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps, Link } from '@reach/router'
import { useQuery, gql } from '@apollo/client'
import { Container as NesContainer } from 'nes-react'

const POKEMON_SEARCH = gql`
  query($name: String) {
    pokemonSearch(name: $name) {
      id
      name
      num
      img
    }
  }
`

const SearchBar: React.FC<RouteComponentProps & { clickLink: Function }> = ({
   clickLink,
 }) => {
   const [ open, setOpen ] = React.useState(false)

   function pressSearchButton() {
      setOpen(true)
    }

   const { loading, error, data } = useQuery(POKEMON_SEARCH)
   const pokemonSearchResults:
     | Array<{ id: string; name: string; img: string; num: string }>
     | undefined = data?.pokemonSearch

     if (loading) {
      return <p>Loading...</p>
    }
    if (error || !pokemonSearchResults) {
      return <p>Error!</p>
    }

   return(
      <NesContainer>
         <button>
            Search By Name
         </button>

         
      </NesContainer>
   )
 }

 export default SearchBar

// const results = fuse.search(query)
  // const pokemonResults = query ? results.map(pokemon => pokemon.item) : data.pokemonMany

//   function onSearch (currentTarget: { value: React.SetStateAction<string> }) {
//    return updateQuery 
      
//   }

//   <form>
//       <label>
//          Search By Name
//       </label>
//       <input type="text" value={query}  onMouseDown={clickLink as any} />     
//    </form>