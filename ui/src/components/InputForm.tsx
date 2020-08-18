import React from 'react'
import { Button } from 'nes-react'


const NesButton = Button as any

const InputForm: React.FC<{
    searchValue: string,
    handleSearchInputChange: any,
    filterState: any,
    handleFilterState: any,
    pressButton: any,
    releaseButtonAll: any,
    releaseButtonSearch: any,
    releaseButtonFilter: any
}> = ({
    searchValue,
    handleSearchInputChange,
    filterState,
    handleFilterState,
    pressButton,
    releaseButtonAll,
    releaseButtonSearch,
    releaseButtonFilter
}) => {
    return (
        <>
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

      <label>Types</label>
      <form>
        <label>Flying</label>
        <input
          type="checkbox"
          name="typeFlyingChecked"
          value="flying"
          checked={filterState.typeFlyingChecked}
          onChange={handleFilterState}
        />
        <label>Fire</label>
        <input
          type="checkbox"
          name="typeFireChecked"
          value="fire"
          checked={filterState.typeFireChecked}
          onChange={handleFilterState}
        />
        <label>Water</label>
        <input
          type="checkbox"
          name="typeWaterChecked"
          value="water"
          checked={filterState.typeWaterChecked}
          onChange={handleFilterState}
        />
        <label>Electric</label>
        <input
          type="checkbox"
          name="typeElectricChecked"
          value="electric"
          checked={filterState.typeElectricChecked}
          onChange={handleFilterState}
        />
      </form>

      <label>Weaknesses</label>
      <form>
        <label>Flying</label>
        <input
          type="checkbox"
          name="weaknessFlyingChecked"
          value="flying"
          checked={filterState.weaknessFlyingChecked}
          onChange={handleFilterState}
        />
        <label>Fire</label>
        <input
          type="checkbox"
          name="weaknessFireChecked"
          value="fire"
          checked={filterState.weaknessFireChecked}
          onChange={handleFilterState}
        />
        <label>Water</label>
        <input
          type="checkbox"
          name="weaknessWaterChecked"
          value="water"
          checked={filterState.weaknessWaterChecked}
          onChange={handleFilterState}
        />
        <label>Electric</label>
        <input
          type="checkbox"
          name="weaknessElectricChecked"
          value="electric"
          checked={filterState.weaknessElectricChecked}
          onChange={handleFilterState}
        />
      </form>  
        <NesButton onMouseDown={pressButton} onMouseUp={releaseButtonFilter}> 
        Filter 
        </NesButton>
        </>
    )
}

export default InputForm