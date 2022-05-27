import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import Button from '../UI/Button/Button';
import './FullMovie.scss';


const FullMovie = ({ 
    match, 
    moviesList, 
    favoriteMovies, 
    toggleFavoriteMovie, 
    isSubmitting 
}) => {
    const { movieId } = match.params;
    // console.log('[match]', match);

    // console.log('[movieId]', movieId);

    const fullMovie = moviesList.find(movie => movie.id === +movieId);

    if (!fullMovie) return <Redirect to='/'/>;

    const { id, title, poster_path, backdrop_path, overview, release_date } = fullMovie;
    /*
    adult: false
    backdrop_path: "/dXqiHsPd2pq2uXbPNegQP1Brh1X.jpg"
    genre_ids: (6) [14, 16, 35, 10751, 9648, 12]
    id: 13355
    original_language: "en"
    original_title: "Scooby-Doo! Pirates Ahoy!"
    overview: "Ghost pirates attack the cruise ship that Scooby and the gang are vacationing on."
    popularity: 20.985
    poster_path: "/6XWQK6mmDbKyrtzr4wJxa6rBfuM.jpg"
    release_date: "2006-01-01"
    title: "Scooby-Doo! Pirates Ahoy!"
    video: false
    vote_average: 7.3
    vote_count: 152
    */

    const baseUrl = 'https://image.tmdb.org/t/p/w500';
    const isFavorite = !!favoriteMovies.find(movie => movie.id === id);

    return (
        <div 
            className="FullMovie"
            style={{
                backgroundImage: `url(${baseUrl}${backdrop_path})`
            }}
        >
            <h1>{title}</h1>

            <div className='FullMovieContent'>
                <div className="ImageWrapper" >
                    <img src={ baseUrl + poster_path } alt={title} />
                </div>

                <div className='FullMovieInfo'>
                    <div className='FullMovieDescription'>
                        <p>{overview}</p>
                        <strong>{release_date}</strong>
                    </div>

                    <Button 
                        styling={ isSubmitting ? 'Disabled' : null } 
                        onClick={() => {
                            toggleFavoriteMovie( isFavorite ? id : fullMovie );
                        }}
                    >
                        { isSubmitting 
                            ? 'Submitting...' 
                            : isFavorite
                                ? 'Remove from Favorite'
                                : 'Add to Favorite'
                        }
                    </Button>
                </div>
            </div>
        </div>
    );
};

FullMovie.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object),
    match: PropTypes.object.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    toggleFavoriteMovie: PropTypes.func.isRequired
};

export default FullMovie;
