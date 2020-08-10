export function firstSyllableCheck(searchTerm: string, pokemonName: string) {
    const vowels = ["a", "e", "i", "o", "u"];

    //clean up both strings
    const arrSearchTerm = searchTerm.toLowerCase().split("");
    const arrPokemonName = pokemonName.toLowerCase().split("");    
    
    //search Pokemon name and find first vowel
    const arrFirstSyllable = arrPokemonName.slice(0, arrPokemonName.findIndex(element => vowels.includes(element))+2)

    //turn arrays back into strings
    const cleanedSearchTerm = arrSearchTerm.join("");
    const cleanedPokemonFirstSyllable = arrFirstSyllable.join("");


    //search search term for defined first syllable
    //if found, return true
    if (cleanedSearchTerm.includes(cleanedPokemonFirstSyllable)) {
        return true;
    } else {
        return false;
    }
} 
