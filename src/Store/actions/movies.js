import axios from 'axios';

import { 
    SET_MOVIES_LIST, 
    ADD_MOVIE_TO_FAVORITE, 
    ADD_FAVORITE_MOVIES,
    REMOVE_MOVIE_FROM_FAVORITE, 
    TOGGLE_FETCHING_STATUS, 
    TOGGLE_SUBMITTING_STATUS 
} from '../actionTypes';

export const fetchMovies = search => {
    const apiKey = '0be1f57881990955e6b41bde9dc4fb50';
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const url = `&language=en-US&query=${search}&page=1&include_adult=false`;

    return dispatch => {
        dispatch(toggleFetchingStatus(true));
        
        axios.get(`${baseUrl}?api_key=${apiKey}${url}`)
            .then(res => {
                const movies = res.data.results;
    
                setTimeout(() => {
                    dispatch(setMoviesList(movies))
                }, 1500);
            })
            .catch(err => console.log('[err]', err))
            .finally(() => {
                setTimeout(() => {
                    dispatch(toggleFetchingStatus(false));
                }, 1500);
            });
    };

};

const toggleFetchingStatus = status => ({
    type:   TOGGLE_FETCHING_STATUS,
    status
});

const setMoviesList = moviesList => ({
    type: SET_MOVIES_LIST,
    moviesList
});

export const toggleFavoriteMovie = favoriteMovie => {
    return (dispatch, getState) => {
        dispatch(toggleSubmittingStatus(true));

        // adding or removing...
        let mode = 'ADD_MOVIE';

        if (typeof favoriteMovie === 'number') {
            mode = 'REMOVE_MOVIE';
        }

        const firebaseKey = getState().auth.firebaseKey;
        // const firebaseKey = localStorage.getItem('firebaseKey');

        const baseUrl = 'https://movies-application-24bc8-default-rtdb.europe-west1.firebasedatabase.app'; // запрос Realtime Database
        const fullUrl = `${baseUrl}/users/${firebaseKey}/favoriteMovies.json`;

        axios.get(fullUrl)
            .then(res => {
                const userMovies = res.data;
                // adding
                if (mode === 'ADD_MOVIE') {
                    axios.post(fullUrl, favoriteMovie)
                        .then(dispatch(setFavoriteMovie(favoriteMovie)));
                } else {
                    for (const key in userMovies) {
                        const userMovie = userMovies[key];
                        if (userMovie.id !== favoriteMovie) continue;

                        axios.delete(`${baseUrl}/users/${firebaseKey}/favoriteMovies/${key}.json`)
                            .then(() => dispatch(removeMovieFromFavorite(favoriteMovie)));
                    }
                    
                }
            })
            .catch(error => console.log('[error]', error))
            .finally(() => dispatch(toggleSubmittingStatus(false)));
    };
};

const setFavoriteMovie = favoriteMovie => ({
    type: ADD_MOVIE_TO_FAVORITE,
    favoriteMovie
});

const removeMovieFromFavorite = movieId => ({
    type: REMOVE_MOVIE_FROM_FAVORITE,
    movieId
});

const toggleSubmittingStatus = status => ({
    type: TOGGLE_SUBMITTING_STATUS,
    status
});

export const getFavoriteMovies = firebaseKey => {
    return dispatch => {
        const baseUrl = 'https://movies-application-24bc8-default-rtdb.europe-west1.firebasedatabase.app/users'; // запрос Realtime Database

        axios.get(baseUrl + `/${firebaseKey}/favoriteMovies.json`)
            .then(res => {
                const favoriteMovies = res.data;
                if (!favoriteMovies) return;

                const movies = [];

                for (const key in favoriteMovies) {
                    movies.push(favoriteMovies[key]);
                }

                dispatch(addFavoriteMovies(movies));
            })
            .catch(error => console.log('[error]', error));
    };
};

const addFavoriteMovies = movies => ({
    type: ADD_FAVORITE_MOVIES,
    movies
})