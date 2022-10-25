import { async } from "@firebase/util";
import { loginWithEmail, logoutFirebase, registerUserWithEmail, singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    };
};

export const startGoogleSingIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();

        if(!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    };
};

export const startCreatingUserWhitEmail = ({name, password, email}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmail({email, password, name});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName: name, email, photoURL}));
    };
};

export const startLogingWithEmail = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    
        const {ok, uid, displayName, photoURL, errorMessage} = await loginWithEmail({email, password});

        if (!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}));
    };
};

export const sartLogOut = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    };
};