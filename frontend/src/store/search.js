const LOAD_SEARCH = 'search/LOAD_SEARCH';

export const loadSearch = (search) => ({
  type: LOAD_SEARCH,
  search
});

export const loadSearchThunk = (q) => async (dispatch) => {



  if (typeof q !== 'string') {
    throw new Error('Search term must be a string');
  }

  try {
    const response = await fetch(`/api/search/${q}`);

    if (response.ok) {
      const result = await response.json();
      dispatch(loadSearch(result));
      return result;
    }
  } catch (error) {
    console.error('Error loading search results:', error);
    throw error;
  }

};

const initialState = {};
const searchReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOAD_SEARCH:
      const newState = {};
      action.search.forEach((product) => {
        newState[product.id] = product;
      });
      console.log("newState", newState)
      return newState;

    default:
      return state;
  }
};

export default searchReducer;
