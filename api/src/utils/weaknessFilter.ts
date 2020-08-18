export const weaknessFilterValuesCheck = (weaknessFilterValues: any, currentPokemon: any) => {
  return weaknessFilterValues.every((filterValue: string) => currentPokemon.weaknesses.includes(filterValue));
}