import { SAVE_USER, SET_AUTH_ERROR, LOGOUT_USER } from '../actionTypes';

const initialState = {
    firebaseKey: null,
    idToken: null,
    localId: null,
    authError: null
};

const saveUser = (state, action) => ({
    ...state,
    firebaseKey: action.firebaseKey,
    idToken: action.idToken,
    localId: action.localId
});

const setAuthError = (state, action) => ({
    ...state,
    authError: action.errorMessage
});

const logoutUser = state => {
    // console.log('[state]', state);
    return {
        ...state,
        firebaseKey: null,
        idToken: null,
        localId: null,
    };
};

const reducer = (state = initialState, action) => { 
    const { type } = action;

    switch (type) {
        case SAVE_USER: return saveUser(state, action);
        case SET_AUTH_ERROR: return setAuthError(state, action);
        case LOGOUT_USER: return logoutUser(state);
        default: return state;
    }
};

export default reducer;