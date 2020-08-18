# The Challenge

This repository is the source code for an incomplete, pretend "Pokédex" web app. It's a code challenge, the challenge being to finish the web app by implementing a few last minute major features in the UI and API.

# Getting Started

## Cloning the Repo

You'll want to start by cloning the repo. (Instructions on cloning repos can be found here: https://help.github.com/en/articles/cloning-a-repository.) Next, you'll want to make sure Node is installed (v12) as well as Yarn (v1, https://classic.yarnpkg.com/lang/en/). Now you're ready to run the UI and API locally

## Running the UI/API

To run the UI and the API locally, just run `yarn start` or `yarn dev` from both the `api` and `ui` folders. Both dev servers should automatically talk to each other.

_Note: In order to avoid any discrepancies running the dev servers, please make sure you're using Node ^12.8.0._




# User Story: 
As a USER I WANT TO to be able to search for Pokemon via a search field and also filter results based on types and weaknesses via checkboxes SO THAT I can choose a custom set of Pokemon that are returned.


# Acceptance Criteria:
Searching
1. Build out a search box that makes search queries to the API
2. Implement a fuzzy search resolver in the API. (You can use a pre-made library to solve this, but please write out a comment in your code defending your decision of which library.)

Filtering
1. Build out filter checkboxes or dropdowns or menus that add filter arguments to your pokemonMany query to the API
2. Implement filtering on the pokemonMany query within the API, handling both types and weaknesses filters

External Libraries:
You are welcome to use external libraries to complete the challenge. However, please be prepared to defend your decisions and, for each library you add, write a comment in the code explaining your choice.

## Use Case Details

1. Implement Searching on the UI & API

- The user should be able to type in a search query in a search box and get fuzzy matches based on the pokemon name. For example, if a user types in "charzirard" into the search box, the search results should show Charizard, but also Charmander, Charmeleon, and perhaps even others based on fuzzy matching of the text.
- Build out a search box that makes search queries to the API
- Implement a fuzzy search resolver in the API

2. Implement filtering on the UI & API

- The user should be able to filter the list of pokemon by their types and weaknesses. Multiple filters should be able to be applied. Multiple filters should follow the "AND" paradigm vs the "OR" paradigm, meaning additional filters should narrow down results, not expand them. For example, if a user chooses the "FLYING" type and the "FIRE" type, you should filter down the pokemon to only those with **both** the "FLYING" and "FIRE" types. Charizard would show up in this list, but Charmander would not, because it does not have the "FLYING" type. Combining type filters with weakness filters should operate in the same way, narrowing down your search results.
- Build out filter checkboxes or dropdowns or menus that add filter arguments to your `pokemonMany` query to the API
- Implement filtering on the `pokemonMany` query within the API, handling both `types` and `weaknesses` filters

# UX Notes: 
Don't focus too much on UX or pretty design. Focus more on meeting the Acceptance Criteria and writing clean code.

# Technical Direction:
Implement solutions that are adhere to the Functional Programming paradigm. Make sure functions are pure and avoid mutating objects.

# Developer Notes for Reviewers:
## API
### api/src/index.ts: 
- Imported fuse.js library to support search (details on choice in code & here):
1.  Given the scale of the current app, this library is sufficiently powerful:
    a. there are multiple options for further configuration such as:
        i. case sensitivity
        ii. sorting by liklihood of match
        iii. pattern location
        iv. threshhold to meet for match score
    b. as measured by the features dictated in the prompt
2. In addition, it has zero dependencies, which reduces developer time in updating said potential dependencies with other libraries
3. It passes all use cases provided (as well as other logical ones)

- Implemented a fuzzy search resolver via pokemonFilterByName query 
- Added filter arguments to pokemonMany query to enable user to filter by types and weaknesses
- Throughout changes utilized non-mutating methods following the Functional Programming paradigm

- Next steps: Search and filter meet the Acceptance Criteria, however I would next discuss with team our future plans and whether we could want to add additional filtering configuration provide by the fuse.js library such as phonetic algorithms

### api/src/utils: 
- Created utility method to abstract away details involved in types & weakness filtering


## UI
### ui/src/screens/Home.tsx:
- Imported helper function to support titlecasing
- Implemented local state tracking hooks for:
    - search field
    - filter values array

    - type and weakness checkboxes:
        - flying
        - fire
        - water
        - electric

- Handle change functions for search and filter
- Added state to reach router navigate function for the three user flows:
    - Return all pokemon
    - Return pokemon using search filter
    - Return pokemon using types and weaknesses checkbox filters

- Added search input field and button
- Added types and weaknesses checkbox inputs and button
- Created reusable view component -> InputForm

### ui/src/screens/pokemon/Pokemon.tsx:
- added POKEMON_SEARCH_BY_NAME & POKEMON_FILTER_BY_TYPES_AND_WEAKNESSES queries
- Modularized views for all, search, filter
- Created reusable view component -> PokemonList

- Next steps: discuss with team longer term architecture and if we want to further implement a container & view component organizational structure

### ui/src/components/InputForm.tsx
- Created reusable view component -> InputForm

### ui/src/components/PokemonList.tsx
- Created reusable view component -> PokemonList

### ui/src/utils/utils.ts:
- Titlecasing helper util
