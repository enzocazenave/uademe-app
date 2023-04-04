import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import backend from "../api/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthContext = () => {

    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const { setUser, setIsChecking } = useContext(AuthContext);

    const login = async(credentials) => {
        const { email, password } = credentials;

        if (email.length === 0) return setLoginError('El correo electrónico es obligatorio.');
        if (password.length < 6) return setLoginError('Las contraseñas tienen un mínimo de 6 caractéres.');

        setIsChecking(true);

        credentials.email = `${credentials.email}@uade.edu.ar`;

        try {
            const { data } = await backend.post('/auth/login', credentials);
            delete data.ok;

            await AsyncStorage.setItem('@uademe:token', data.session.token);
            delete data.session.token;
            
            setUser(data.session);
            setIsChecking(false);
            setLoginError('');
        } catch(error) {
            setLoginError(error?.response?.data?.msg);
            console.log(error);
            setIsChecking(false);
        }
    }

    return {
        login,
        loginError
    }
}