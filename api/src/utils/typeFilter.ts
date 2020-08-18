export const typeFilterValuesCheck = (typeFilterValues: any, currentPokemon: any) => {
  return typeFilterValues.every((filterValue: string) => currentPokemon.types.includes(filterValue));
}
