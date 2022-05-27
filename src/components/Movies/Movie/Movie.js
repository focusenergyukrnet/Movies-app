// import React from 'react';
// import PropTypes from 'prop-types';

// import './Movie.scss';

// const Movie = ({ 
//     info: {
//         title,
//         poster_path
//     } }) => {
//         /*
//         adult: false
//         backdrop_path: "/dXqiHsPd2pq2uXbPNegQP1Brh1X.jpg"
//         genre_ids: (6) [14, 16, 35, 10751, 9648, 12]
//         id: 13355
//         original_language: "en"
//         original_title: "Scooby-Doo! Pirates Ahoy!"
//         overview: "Ghost pirates attack the cruise ship that Scooby and the gang are vacationing on."
//         popularity: 29.435
//         poster_path: "/6XWQK6mmDbKyrtzr4wJxa6rBfuM.jpg"
//         release_date: "2006-01-01"
//         title: "Scooby-Doo! Pirates Ahoy!"
//         video: false
//         vote_average: 7.3
//         vote_count: 151
    
//     */

//     const baseUrl = 'https://image.tmdb.org/t/p/w500';

//     return (
//         <div className="Movie">
//             <h1>{title}</h1>

//             <div className="ImageWrapper">
//                 <img src={baseUrl + poster_path} alt={title} />
//             </div>

//             <a href="/">Read More</a>
//         </div>
//     );
// };

// Movie.propTypes = {
//     info: PropTypes.object.isRequired
// };

// export default Movie;



import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Movie.scss';


const Movie = ({ 
    info: {
        title,
        poster_path,
        id
    } 
}) => {

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

    return (
        <div className="Movie">
            <h1>{title}</h1>

            <div className="ImageWrapper" >
                <img src={ baseUrl + poster_path } alt={title} />
            </div>

            <Link to={`/movies/${id}`}>Read More</Link> 
        </div>
    );
};

Movie.propTypes = {
    info: PropTypes.object.isRequired
};

export default Movie;
