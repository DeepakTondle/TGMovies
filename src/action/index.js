import axios from "axios";
const axiosInstance = axios.create({});

/**
 * Action called for getting movie list
 */
export const getMovieList = (page, searchParam) => {
    return dispatch => {
        let apiUrl = "";
        if (searchParam) {
            apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=0f8cfa5f3e87264de342e013cb9c95fb&query=${searchParam}&page=${page}`;
        } else {
            apiUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=0f8cfa5f3e87264de342e013cb9c95fb&page=${page}`;
        }
        const result = axiosInstance.get(apiUrl);
        dispatch(setLoadingMessage("Loading..."));
        result.then((response) => {
            dispatch(setLoadingMessage(""));
            dispatch({
                type: "GET_MOVIE_LIST",
                payload: response.data
            });
            if (response.data.results && response.data.results.length === 0) {
                dispatch(setLoadingMessage("No Record Found!!!"));
            }
        }).catch(() => {
            dispatch({
                type: "GET_MOVIE_LIST",
                payload: {results: []}
            });
            dispatch(setLoadingMessage("No Record Found!!!"));
        });
    };
};
/**
 * Action called when user type something to search 
 */
export const searchParam = (data) => {
    return {
        type: "SEARCH_PARAM",
        payload: data
    };
};
/**
 * Action called when user reset the search in the search box
 */
export const resetMovieList = () => {
    return {
        type: "RESET_MOVIE_LIST"
    };
};
/**
 * Action called when page count changes
 */
export const setPageCount = (data) => {
    return {
        type: "SET_PAGE_COUNT",
        payload: data
    };
};
/**
 * Action called when user click on search button 
 */
export const setSearchFlag = (data) => {
    return {
        type: "SET_SEARCH_FLAG",
        payload: data
    };
};
/**
 * Action called data loads
 */
export const setLoadingMessage = (data) => {
    return {
        type: "SET_LOADING_MESSAGE",
        payload: data
    };
};
