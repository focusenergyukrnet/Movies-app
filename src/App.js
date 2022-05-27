import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import CSSTransition from 'react-transition-group/CSSTransition';

import Backdrop from './components/UI/Backdrop/Backdrop';
import Toggler from './components/UI/Toggler/Toggler';
import Sidedrawer from './components/Sidedrawer/Sidedrawer';
import Toolbar from './components/Toobar/Toolbar';
import Movies from './components/Movies/Movies';
import Footer from './components/Footer/Footer';
import Spinner from './components/UI/Spinner/Spinner';
import FullMovie from './components/FullMovie/FullMovie';
import Auth from './containers/Auth/Auth';
import FavoriteMovies from './components/FavoriteMovies/FavoriteMovies';
import * as moviesActions from './Store/actions/movies';
import * as authActions from './Store/actions/auth';
import './App.scss';

class App extends Component {
    state = {
        search: '',
        showModal: false,
        movieId: null,
        showSidedrawer: false
    }

    componentDidMount() {
        const { saveUser, getFavoriteMovies, history } = this.props;
        
        const firebaseKey = localStorage.getItem('firebaseKey');
        const idToken = localStorage.getItem('idToken');
        const localId = localStorage.getItem('localId');

        if (firebaseKey && idToken && localId) {
            // send request, get favorite movies
            getFavoriteMovies(firebaseKey);

            return saveUser(firebaseKey, idToken, localId);
        }
        
        history.push('/auth');
    }

    componentDidUpdate(prevProps) {
        const { 
            getFavoriteMovies, 
            fetchMovies, 
            isAuthenticated, 
            firebaseKey 
        } =this.props;

        if (!prevProps.isAuthenticated && isAuthenticated) {
            fetchMovies('Pirates');
            getFavoriteMovies(firebaseKey);
        }
    }
    
    onChangeInputHandler = e => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
    
    // https://api.themoviedb.org/3/search/movie?api_key=0be1f57881990955e6b41bde9dc4fb50&language=en-US&page=1&include_adult=false

    fetchMoviesHandler = () => {
       const { search } = this.state;

       if (!search) return;

       const { fetchMovies } = this.props;
        
        fetchMovies(search);
    }

    logoutAndRedirect = () => {
        const { logoutUser, history } = this.props;

        logoutUser();
        history.push('/auth');
    }

    toggleModalHandler = status => {
        if (status) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '14px';
        } else {
            setTimeout(() => {
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
            }, 400);
        }

        this.setState({ showModal: status });
    }

    setMovieId = id => {
        if (!id) {
            this.setState({ movieId: null });
        } else {
            this.setState({ movieId: id });
        }
    }

    toggleSidedrawerHandler = status => {
        this.setState({ showSidedrawer: status });
    }

    render() {
        const { search, showModal, movieId, showSidedrawer } = this.state;

        const { 
            moviesList, 
            favoriteMovies, 
            isFetching, 
            isSubmitting, 
            isAuthenticated,
            toggleFavoriteMovie
        } = this.props;
        return (
            <div className="App">
                <Toolbar 
                    search={search}
                    isFetching={isFetching}
                    isAuthenticated={isAuthenticated}
                    onChange = {this.onChangeInputHandler} 
                    onClick = {this.fetchMoviesHandler}
                    logout={this.logoutAndRedirect}
                />
                
                <CSSTransition
                    in={showSidedrawer}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames={{ exitActive: 'Hidden' }}
                >
                    <Sidedrawer
                        isAuthenticated={isAuthenticated}
                        logout={this.logoutAndRedirect}
                    />
                </CSSTransition>
                
                <CSSTransition
                    in={showSidedrawer}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enterActive: 'Shown',
                        exitActive: 'Hidden'
                    }}
                >   
                    <Backdrop onClick={() => 
                        this.toggleSidedrawerHandler(false)}
                    />
                </CSSTransition>

                <CSSTransition
                    in={!showSidedrawer}
                    timeout={300}
                    mountOnEnter
                    unmountOnExit
                    classNames={{
                        enterActive: 'Shown',
                        exitActive: 'Hidden'
                    }}
                >
                    <Toggler openSidedrawer={() => 
                        this.toggleSidedrawerHandler(true)} 
                    />
                </CSSTransition>

                <Switch>
                    {
                        isAuthenticated &&
                            <Route 
                                path='/' 
                                exact
                                render={() => (
                                    <>
                                        { isFetching && <Spinner /> }

                                        {
                                            moviesList.length 
                                                ? <Movies moviesList={moviesList} /> 
                                                : null 
                                        }
                                    </>
                                )}
                            />
                    }

                    {
                        isAuthenticated &&
                            <Route 
                                path="/favorite"
                                render={props => (
                                    <FavoriteMovies 
                                        {...props}  
                                        movies={favoriteMovies}
                                        showModal={showModal}
                                        movieId={movieId}
                                        toggleModal={this.toggleModalHandler}
                                        removeFavoriteMovie={toggleFavoriteMovie}
                                        setMovieId={this.setMovieId}
                                    />
                                )} 
                            />
                    }

                    {
                        !isAuthenticated &&
                            <Route 
                                path="/auth"
                                render={() => (
                                    <Auth />
                                )} 
                            />
                    }

                    {
                        isAuthenticated &&
                            <Route 
                                path="/movies/:movieId"
                                render={props => (
                                    <FullMovie 
                                        {...props}
                                        moviesList={moviesList} 
                                        favoriteMovies={favoriteMovies} 
                                        toggleFavoriteMovie={toggleFavoriteMovie}
                                        isSubmitting={isSubmitting}
                                    />
                                )} 
                            />
                    }

                    <Redirect from='/*' to='/' />
                </Switch>
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    moviesList: PropTypes.arrayOf(PropTypes.object).isRequired,
    favoriteMovies: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleFavoriteMovie: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    fetchMovies: PropTypes.func.isRequired,
    firebaseKey: PropTypes.string
};

const mapStateToProps = state => ({
    moviesList: state.movies.moviesList,
    favoriteMovies: state.movies.favoriteMovies,
    isFetching: state.movies.isFetching,
    isSubmitting: state.movies.isSubmitting,
    isAuthenticated: !!state.auth.idToken && !!state.auth.localId,
    firebaseKey: state.auth.firebaseKey
});

const mapDispatchToProps = dispatch => ({
    fetchMovies: search => dispatch(moviesActions.fetchMovies(search)),
    logoutUser: () => dispatch(authActions.logoutUser()),
    saveUser: (firebaseKey, idToken, localId) => {
        dispatch(authActions.saveUser(firebaseKey, idToken, localId));
    },
    toggleFavoriteMovie: favoriteMovie => {
        dispatch(moviesActions.toggleFavoriteMovie(favoriteMovie));
    },
    getFavoriteMovies: firebaseKey => {
        dispatch(moviesActions.getFavoriteMovies(firebaseKey));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(App));


