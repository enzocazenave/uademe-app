import { createContext, useEffect, useState } from 'react';
import backend from '../api/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

export const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

    const [action, setAction] = useState('login');
    const [isChecking, setIsChecking] = useState(true);
    const [user, setUser] = useState({});
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [otpError, setOtpError] = useState('');
    const [appState, setAppState] = useState('');

    const resetError = () => {
        setLoginError('');
        setRegisterError('');
        setOtpError('');
    }

    useEffect(() => {
        validateToken();
    }, []);

    useEffect(() => {
        const handleChange = (state) => {
            setAppState(state);
        }

        AppState.addEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const changeStatus = async () => {
            if (appState == 'background') {
                await backend.patch(`/user/isonline/${user._id}`, { isOnline: false });
                return;
            }

            if (appState == 'active') {
                await backend.patch(`/user/isonline/${user._id}`, { isOnline: true });
            }
        }

        if (user?._id) changeStatus();
    }, [appState, user]);

    const validateToken = async () => {
        setIsChecking(true);

        try {
            const { data } = await backend.get('/auth/check');

            if (!data.ok) {
                await AsyncStorage.removeItem('@uademe:token');
                setIsChecking(false);
                return;
            }

            setUser(data);
            setIsChecking(false);
        } catch (error) {
            setUser({});
            setIsChecking(false);
        }
    }



    return (
        <AuthContext.Provider
            value={{
                action,
                user,
                setAction,
                setUser,
                isChecking,
                setIsChecking,
                setLoginError,
                setRegisterError,
                setOtpError,
                loginError,
                registerError,
                otpError,
                resetError
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}