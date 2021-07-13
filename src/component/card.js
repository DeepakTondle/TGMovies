import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, OverlayTrigger, Tooltip, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList, setPageCount } from "../action/index";
import noImageFound from "../images/No-Image-Found-400x264.png";

const CardContainer = () => {
    /**
     * movie list state
     */
    const [movieList, setMovieList] = useState([]);
    /**
     * Dispatch instance
     */
    const dispatch = useDispatch();
    /**
     * selectors
     */
    const movieListSelector = useSelector((state) =>
        state.movieList
    );
    const movieObjSelector = useSelector((state) =>
        state.movieObj
    );
    const searchSelector = useSelector((state) =>
        state.searchParam
    );
    const countSelector = useSelector((state) =>
        state.pageCount
    );
    const searchFlagSelector = useSelector((state) =>
        state.searchFlag
    );
    const loadingMessageSelector = useSelector((state) =>
        state.loadingMessage
    );
    /**
     * use effect hook for movie list update
     */
    useEffect(() => {
        setMovieList(movieListSelector)
    }, [movieListSelector]);
    /**
     * use effect hook for page count and search param update
     */
    useEffect(() => {
        if (countSelector) {
            dispatch(getMovieList(countSelector, searchSelector));
        }
    }, [countSelector, searchSelector]);
    /**
     * load more data click handler
     */
    const loadMoreHandler = () => {
        dispatch(setPageCount(countSelector + 1));
    }

    return (
        <Container>
            {searchFlagSelector && <Row className="mb-2">
                <Col sm={12}>
                    <strong>Search Result: {movieObjSelector.total_results}</strong>
                </Col>
            </Row>}
            <Row>
                {
                    movieList && movieList.length > 0 ?
                        (movieList.map((movie, index) =>
                            ((movie.original_title || movie.original_name) && <Col sm={4} className="mb-3" key={movie.id + index}>
                                <Card>
                                    <Card.Img variant="top" src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` : noImageFound} alt="No Image" />
                                    <Card.Body>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id={`tooltip-${movie.id}`}>
                                                    {movie.original_title || movie.original_name}
                                                </Tooltip>
                                            }
                                        >
                                            <Card.Title className="text-overflow">{movie.original_title || movie.original_name}</Card.Title>
                                        </OverlayTrigger>
                                        <Card.Text>
                                            Release Date:{' '} {movie.release_date || movie.first_air_date}
                                        </Card.Text>
                                        <Card.Text><strong>Ratings:</strong>{' '}<Badge variant="success">{movie.vote_average}</Badge></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>)
                        )) : (
                           loadingMessageSelector && <Col sm={12}>
                                <Alert variant="warning">
                                    {loadingMessageSelector}
                                </Alert>
                            </Col>
                        )
                }
            </Row>
            {
                movieObjSelector && movieObjSelector.total_pages !== countSelector && movieList && movieList.length > 0 &&
                <Row>
                    <Col sm={12} className="text-right mb-3">
                        <Button variant="danger" onClick={() => loadMoreHandler()}>Load More...</Button>
                    </Col>
                </Row>
            }

        </Container>
    );
}

export default CardContainer;
