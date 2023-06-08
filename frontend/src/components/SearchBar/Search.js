import './Search.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSearchThunk } from '../../store/search';
import { useHistory } from "react-router-dom";
import {BsSearchHeart} from 'react-icons/bs';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const history = useHistory()
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchState);


  const handleInput = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(loadSearchThunk(search));
  };

  useEffect(() => {
    dispatch(loadSearchThunk(search));
  }, [search, dispatch]);

  const isCursorInSearchInput = search.length > 0;

  const handleResultClick = (result) => {
    history.push(`/products/${result.id}`);
    setSearch('');
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="SearchContainer">
          <input
            className="SearchInput"
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleInput}
          />
             <BsSearchHeart className='SearchSymbol'/>
        </div>


      </form>

      {isCursorInSearchInput && (
        <div className="SearchPage">
          {Object.values(searchResults).map((result) => (
            <div className="SearchResultItem" key={result.id}
            onClick={() => handleResultClick(result)}
            >
              <h3>{result.name}</h3>


            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
