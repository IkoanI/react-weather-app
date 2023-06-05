import { useState } from "react"
import { AsyncPaginate } from "react-select-async-paginate"
import { cityApiOptions, cityApiUrl } from "../api/cities-api"

export default function Search({ onSearchChange }) {
  const [search, setSearch] = useState(null)

  function handleSearch(searchData) {
    setSearch(searchData)
    onSearchChange(searchData)
  }

  async function loadOptions(inputValue) {
    try {
      const response = await fetch(`${cityApiUrl}?minPopulation=1000000&namePrefix=${inputValue}`, cityApiOptions);
      const result = await response.json();
      return {
        options: result.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`
          }
        })
      }
    }

    catch (error) {
      console.error(error);
    }
  }

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleSearch}
      loadOptions={loadOptions}
    />
  )
}
