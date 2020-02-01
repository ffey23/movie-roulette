import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../services/api';
import Swal from 'sweetalert2';
import Rating from 'react-rating';
import './MovieDetails.scss'
import Loader from '../../components/Loader/Loader';

const MovieDetails = () => {
    const {id} = useParams();
    const [movie, setMovie] = useState(null);
    const [myRating, setMyRating] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {   
        api.movies.get_details(id, localStorage.getItem('session_id'))
        .then(movie => {
            setMovie(movie);
            setMyRating(movie.account_states.rated ? movie.account_states.rated.value :  0)
        }, err => {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Unable to load movie!',
            });
        }).finally(() => {
            setLoading(false)
        });
    }, [id])

    const rate = (value) => {

        // Needed for later reseting to the old value on error - othervise it wouldn't rerender
        setMyRating(value);
        api.movies.rate(id, localStorage.getItem('session_id'), value).then(movie => {
            Swal.fire({
                icon: 'success',
                title: 'Movie rated!',
            });
        }, err => {
            // Reseting to old value on error
            const oldValue = myRating;
            setMyRating(oldValue);
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: 'Try rate again!',
            });
        });

    }
    if(!movie) {
        return null;
    }
    return (
        <div className="movie-details">
            <h2 className="movie-details__header">
                {movie.original_title}
            </h2>
            <div className="movie-details__poster">
                <img 
                    src={`${process.env.REACT_APP_IMAGES_BASE_URL}w500/${movie.poster_path}`}
                    className="movie-details__image"
                    alt={`Poster for movie ${movie.original_title}`}
                />
                <div className="movie-details__overview">
                    {movie.overview}
                </div>
                <div className="movie-details__rating">
                    <Rating 
                        stop={10}
                        fractions={2}
                        initialRating={myRating}
                        readonly={myRating !== 0}
                        onChange={rate}
                        emptySymbol="icon-star-empty"
                        fullSymbol="icon-star-full"
                        />
                    My rating: {myRating}
                </div>
                <div className="movie-details__about">
                    <p className="movie-details__about-info">
                        Rating: {movie.vote_average}
                    </p>
                    <p className="movie-details__about-info">
                        Popularity: {movie.popularity}
                    </p>
                    <p className="movie-details__about-info">
                        Language: {movie.original_language}
                    </p>
                    <p className="movie-details__about-info">
                        Production companies: {movie.production_companies.map((c) => c.name ).join(', ')}
                    </p>
                </div>
            </div>
            { loading && <Loader message="Movie is loading"/>}
        </div>
    );

}

export default MovieDetails;