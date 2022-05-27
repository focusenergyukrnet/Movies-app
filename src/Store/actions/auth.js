import axios from 'axios';

import { SET_AUTH_ERROR, SAVE_USER, LOGOUT_USER } from '../actionTypes';

export const authenticateUser = ({ mode, email, password, fullName }) => {
    return dispatch => {
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        //'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

        const apiKey = 'AIzaSyCdFMci_rWqf1S3n-YPKBdJhzF48uJNaBM'; // movies-application

        const url = mode === 'SIGN_UP' ? 'signUp?key=' : 'signInWithPassword?key=';

        const user = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        }

        axios.post(baseUrl + url + apiKey, user)
            .then(res => {
                const { displayName, idToken, localId } = res.data;

                if (mode === 'SIGN_UP') {
                    const databaseUrl = 'https://movies-application-24bc8-default-rtdb.europe-west1.firebasedatabase.app' // запрос Realtime Database 

                    const userData = { 
                        fullName: fullName.value, 
                        email: email.value, 
                        password: password.value 
                    };

                    // https://identitytoolkit.googleapis.com/v1/accounts:update?key=[API_KEY] - сохранить firebaseKey пользователя в displayName

                    axios.post(`${databaseUrl}/users.json`, userData)
                        .then(res => {
                            const firebaseKey = res.data.name;

                            localStorage.setItem('firebaseKey', firebaseKey);
                            localStorage.setItem('idToken', idToken);
                            localStorage.setItem('localId', localId);

                            dispatch(saveUser(firebaseKey, idToken, localId));

                            const updatedUserProfile = {
                                displayName: firebaseKey,
                                idToken
                            }

                            axios.post(
                                baseUrl + 'update?key=' + apiKey, updatedUserProfile
                            );
                        });
                } else {
                    localStorage.setItem('firebaseKey', displayName);
                    localStorage.setItem('idToken', idToken);
                    localStorage.setItem('localId', localId);
    
                    dispatch(saveUser(displayName, idToken, localId));
                }
            })
            .catch(error => {
                const { message } = error.response.data.error;

                dispatch(setAuthError(message));
            });
    };
};

export const saveUser = (firebaseKey, idToken, localId) => ({
    type: SAVE_USER,
    firebaseKey,
    idToken,
    localId
});

const setAuthError = errorMessage => ({
    type: SET_AUTH_ERROR,
    errorMessage
});

export const logoutUser = () => {
    localStorage.removeItem('firebaseKey');
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');

    return {
        type: LOGOUT_USER
    };
};