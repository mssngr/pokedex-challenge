import React from 'react'
import styled from 'styled-components'
import Sound from 'react-sound'
import { navigate } from '@reach/router'
import { Button } from 'nes-react'
import { RouteComponentProps } from '@reach/router'
import {toTitleCase} from '../utils/utils';

const NesButton = Button as any

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

  //filter values state
  const initialFilterValues: string[] = [];
  const [filterValues, setFilterValues] = React.useState(initialFilterValues)
  
  //checkbox state
  const [flyingChecked, setFlyingIsChecked] = React.useState(false)
  const [fireChecked, setFireIsChecked] = React.useState(false)
  const [waterChecked, setWaterIsChecked] = React.useState(false)
  const [electricChecked, setElectricIsChecked] = React.useState(false)

  //search field handle change
  const handleSearchInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "searchField") {
      setSearchValue(value);
    } 
  }

  //checkbox handle change
  //flying
  const handleFlyingCheckBoxInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "flyingFilterField" && flyingChecked === false) {
      setFlyingIsChecked(!flyingChecked);
      setFilterValues(filterValues => [...filterValues, toTitleCase(value)]);
    } else if (name === "flyingFilterField" && flyingChecked === true) {
      setFlyingIsChecked(!flyingChecked);
      setFilterValues(filterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    }
  }

  //fire
  const handleFireCheckBoxInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "fireFilterField" && fireChecked === false) {
      setFireIsChecked(!fireChecked);
      setFilterValues(filterValues => [...filterValues, toTitleCase(value)]);
    } else if (name === "fireFilterField" && fireChecked === true) {
      setFireIsChecked(!fireChecked);
      setFilterValues(filterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    }
  }

  //water
  const handleWaterCheckBoxInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "waterFilterField" && waterChecked === false) {
      setWaterIsChecked(!waterChecked);
      setFilterValues(filterValues => [...filterValues, toTitleCase(value)]);
    } else if (name === "waterFilterField" && waterChecked === true) {
      setWaterIsChecked(!waterChecked);
      setFilterValues(filterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    }
  }

  //electric
  const handleElectricCheckBoxInputChange = (event: any) => {
    const {name, value} = event.target;

    if (name === "electricFilterField" && electricChecked === false) {
      setElectricIsChecked(!electricChecked);
      setFilterValues(filterValues => [...filterValues, toTitleCase(value)]);
    } else if (name === "electricFilterField" && electricChecked === true) {
      setElectricIsChecked(!electricChecked);
      setFilterValues(filterValues.filter((filterValue) => filterValue !== toTitleCase(value)))
    }
  }  
   
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
          searchValue: filterValues
        }
      })
    }, 300)
    setTimeout(() => {
      setIsButtonReleased(false)
    }, 300)
  }

  return (
    <Container>
      <h1>Welcome to your Pokédex!</h1>
      <NesButton onMouseDown={pressButton} onMouseUp={releaseButtonAll}> 
        See All Pokemon!
      </NesButton>
      <br/>

      <form>
        <input
        placeholder="Search for Pokemon here"
        type="input"
        name="searchField"
        value={searchValue}
        onChange={handleSearchInputChange}
        />        
      </form>
      <NesButton onMouseDown={pressButton} onMouseUp={releaseButtonSearch}> 
        Search
      </NesButton>

      <br/>

      <form>
        <label>Flying</label>
        <input
          type="checkbox"
          name="flyingFilterField"
          value="flying"
          checked={flyingChecked}
          onChange={handleFlyingCheckBoxInputChange}
        />
        <label>Fire</label>
        <input
          type="checkbox"
          name="fireFilterField"
          value="fire"
          checked={fireChecked}
          onChange={handleFireCheckBoxInputChange}
        />
        <label>Water</label>
        <input
          type="checkbox"
          name="waterFilterField"
          value="water"
          checked={waterChecked}
          onChange={handleWaterCheckBoxInputChange}
        />
        <label>Electric</label>
        <input
          type="checkbox"
          name="electricFilterField"
          value="electric"
          checked={electricChecked}
          onChange={handleElectricCheckBoxInputChange}
        />
      </form>
      <NesButton onMouseDown={pressButton} onMouseUp={releaseButtonFilter}> 
        Filter 
      </NesButton>

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
