import React from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { navigate } from '@reach/router'
import { RouteComponentProps } from '@reach/router'

//components
import InputForm from '../components/InputForm'

//internal utils
import {toTitleCase} from '../utils/utils';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Home: React.FC<RouteComponentProps> = () => {
  const [isButtonPressed, setIsButtonPressed] = React.useState(false)
  const [isButtonReleased, setIsButtonReleased] = React.useState(false)

  //search field state
  const [searchValue, setSearchValue] = React.useState("")

  //checkbox values state to filter searches
  const initialTypeFilterValues: string[] = [];
  const initialWeaknessFilterValues: string[] = [];

  const [typeFilterValues, setTypeFilterValues] = React.useState(initialTypeFilterValues)
  const [weaknessFilterValues, setWeaknessFilterValues] = React.useState(initialWeaknessFilterValues)

  //checkbox state
  const [filterState, setFilterState] = React.useReducer(
    (state: any, newState: any) => ({...state, ...newState}),
    {
      // types
      typeFlyingChecked: false,
      typeFireChecked: false,
      typeWaterChecked: false,
      typeElectricChecked: false,

      // weaknesses
      weaknessFlyingChecked: false,
      weaknessFireChecked: false,
      weaknessWaterChecked: false,
      weaknessElectricChecked: false
    }
  )

  //search field handle change
  const handleSearchInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "searchField") { 
      setSearchValue(value);
    } 
  }
  
  //checkbox handle change
  const handleFilterState = (event: any) => {
    const {name, value} = event.target;
    
    //update type filter values array
    if (name.includes("type") && typeFilterValues.includes(toTitleCase(value))) {
      //removes value from array of type values
      setTypeFilterValues(typeFilterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    } else if (name.includes("type") && !typeFilterValues.includes(toTitleCase(value))) {
      //adds value from array of type values
      setTypeFilterValues(typeFilterValues => [...typeFilterValues, toTitleCase(value)]);
    } 
    //update weakness filter values array
    else if (name.includes("weakness") && weaknessFilterValues.includes(toTitleCase(value))) {
      //removes value from array of weakness values
      setWeaknessFilterValues(weaknessFilterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    } else if (name.includes("weakness") && !weaknessFilterValues.includes(toTitleCase(value))) {
      //adds value from array of weakness values
      setWeaknessFilterValues(weaknessFilterValues => [...weaknessFilterValues, toTitleCase(value)]);
    } 
    
    //update boolean
    setFilterState({[name]: !filterState[name]})
  }

  //handle buttons
  function pressButton() {
    setIsButtonPressed(true)
    setTimeout(() => {
      setIsButtonPressed(false)
    }, 300)
  }

  function releaseButtonAll() {
    setIsButtonReleased(true)
    setTimeout(() => {
      navigate('/pokemon', {
        state: {
          searchValue: "All"
        }
      })
    }, 300)
    setTimeout(() => {
      setIsButtonReleased(false)
    }, 300)
  }

  function releaseButtonSearch() {
    setIsButtonReleased(true)
    setTimeout(() => {
      navigate('/pokemon', {
        state: {
          searchValue: toTitleCase(searchValue)
        }
      })
    }, 300)
    setTimeout(() => {
      setIsButtonReleased(false)
    }, 300)
  }

  function releaseButtonFilter() {
    setIsButtonReleased(true)
    setTimeout(() => {
      navigate('/pokemon', {
        state: {
          searchValue: 
          {
            typeSearchValues: typeFilterValues,
            weaknessSearchValues: weaknessFilterValues
          }
        }
      })
    }, 300)
    setTimeout(() => {
      setIsButtonReleased(false)
    }, 300)
  }


  //Review note: Made InputForm into reusable component
  //Please see further notes / user story / acceptance criteria in README
  return (
    <Container>
      <InputForm
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
        filterState={filterState}
        handleFilterState={handleFilterState}
        pressButton={pressButton}
        releaseButtonAll={releaseButtonAll}
        releaseButtonSearch={releaseButtonSearch}
        releaseButtonFilter={releaseButtonFilter}
      />

      <Sound
        url="/audio/clickPress.mp3"
        playStatus={isButtonPressed ? 'PLAYING' : 'STOPPED'}
        autoLoad={true}
        volume={50}
      />
      <Sound
        url="/audio/clickRelease.mp3"
        playStatus={isButtonReleased ? 'PLAYING' : 'STOPPED'}
        autoLoad={true}
        volume={50}
      />
    </Container>
  )
}

export default Home
