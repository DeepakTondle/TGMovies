const initialState = {
    movieObj: {},
    movieList: [],
    searchParam: "",
    pageCount: 1,
    searchFlag: false,
    loadingMessage: ""
};

const RootReduer = (state, action) => {
    if (state && Object.keys(state).length === 0) {
        state = initialState;
    }
    switch (action.type) {
        case "GET_MOVIE_LIST":
            return { ...state, movieObj: action.payload, movieList: [...state.movieList, ...action.payload.results] };
            break;
        case "SEARCH_PARAM":
            return {...state, searchParam: action.payload};
            break;
        case "RESET_MOVIE_LIST":
            return {...state, movieObj: {}, movieList: []};
            break;
        case "SET_PAGE_COUNT":
            return {...state, pageCount: action.payload};
            break;
        case "SET_SEARCH_FLAG":
            return {...state, searchFlag: action.payload};
            break;
        case "SET_LOADING_MESSAGE":
            return {...state, loadingMessage: action.payload};
            break;
        default: return state;
    }
}

export default RootReduer;
