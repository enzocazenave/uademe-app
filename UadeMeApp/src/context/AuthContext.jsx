import { createContext, useEffect, useState } from 'react';
import backend from '../api/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [action, setAction] = useState('login');
    const [isChecking, setIsChecking] = useState(true); 
    const [user, setUser] = useState({});
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [otpError, setOtpError] = useState('');

    const resetError = () => {
        setLoginError('');
        setRegisterError('');
        setOtpError('');
    }

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async() => {
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
        } catch(error) {
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
            { children }
        </AuthContext.Provider>
    )
}