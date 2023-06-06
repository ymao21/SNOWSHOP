

const LOAD_SEARCH = 'search/LOAD_SEARCH'

export const loadSearch = (search) => ({
    type:LOAD_SEARCH,
    search
})


export const loadSearchThunk = (q) => async dispatch => {

    const response = await fetch(`/api/search/${q}`)

    if(response.ok) {
        const result = await response.json()
        dispatch(loadSearch(result))
        return result
    }

}


const initialState = {}
const searchReducer = (state = initialState, action) => {

    let newState = {...state};
    switch(action.type) {
        case LOAD_SEARCH:
            action.search.forEach((product) => {
            newState[product.id] = product
            });
            return newState

        default:
            return state;
    }
}

export default searchReducer
