import React, { useState } from "react";
import { InputGroup, FormControl, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { searchParam, resetMovieList, getMovieList, setPageCount, setSearchFlag } from "../action/index";
const SearchBox = () => {
    /**
     * state
     */
    const [query, setQuery] = useState("");
    /**
     * Dispatch instance
     */
    const dispatch = useDispatch();
    /**
     * selector for search Flag
     */
    const searchFlagSelector = useSelector((state) =>
        state.searchFlag
    );
    /**
     * Search result click handler
     */
    const searchClickHandler = () => {
        dispatch(resetMovieList());
        dispatch(setPageCount(1));
        if (query) {
            dispatch(searchParam(query));
            dispatch(setSearchFlag(true));
        }
    }
    /**
     * Reset search result click handler
     */
    const clearSearchHandler = () => {
        dispatch(resetMovieList());
        dispatch(searchParam(""));
        dispatch(setPageCount(1));
        dispatch(setSearchFlag(false));
        setQuery("");
    }
    return (
        <Container className="mt-3 searchBoxContainer">
            <Row>
                <Col sm={12}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search Movies and TV Shows"
                            aria-label="Search Movies and TV Shows"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                        <InputGroup.Append>
                            <Button variant="success" onClick={() => searchClickHandler()}>Search</Button>
                            {
                                query && searchFlagSelector &&
                                <Button variant="link" onClick={() => clearSearchHandler()}>Reset</Button>
                            }
                        </InputGroup.Append>
                    </InputGroup>

                </Col>
            </Row>
        </Container>
    );
}

export default SearchBox;
