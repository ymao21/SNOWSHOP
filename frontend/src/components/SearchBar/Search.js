import './Search.css'
import { useState } from 'react'

const SearchBar = () => {

    const [search, setSearch] = useState('');

    const handleInput = (e) => {
        setSearch(e.target.value);
      };

      const handleSearch = (e) => {

      };

    return (
        <form >
        <input className='SearchInput'
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleInput}
        />
        <button className="SearchButton" type="submit">Search</button>
      </form>
    )
}


export default SearchBar
