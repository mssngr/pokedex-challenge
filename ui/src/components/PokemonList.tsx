import React from 'react'
import styled from 'styled-components'
import { Link } from '@reach/router'
import { Container as NesContainer } from 'nes-react'
import { ApolloError } from '@apollo/client'

const Container = styled(NesContainer)`
  && {
    background: white;
    margin: 2rem 25%;

    ::after {
      z-index: unset;
      pointer-events: none;
    }
  }
`

const List = styled.ul`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-end;
`

const ListItem = styled.li`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 1rem;

  > *:first-child {
    margin-right: 1rem;
  }
`

const PokemonList: React.FC<{
    clickLink: Function, 
    pokemonList: Array<{ id: string; name: string; img: string; num: string }> | undefined
    loading: boolean,
    error: ApolloError | undefined
}> = ({
    clickLink,
    pokemonList,
    loading,
    error
  }) => {
    
      if (loading) {
        return <p>Loading...</p>
      }
      if (error || !pokemonList) {
        return <p>Error!</p>
      }
    
    return (
      <Container rounded>
        <List>
          {pokemonList.map(pokemon => (
            <Link to={pokemon.id} onMouseDown={clickLink as any}>
              <ListItem>
                <img src={pokemon.img} />
                {pokemon.name} - {pokemon.num}
              </ListItem>
            </Link>
          ))}
        </List>
      </Container>
    )
  }

  export default PokemonList