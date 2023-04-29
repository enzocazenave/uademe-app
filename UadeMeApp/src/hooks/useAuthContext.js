import { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import backend from "../api/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthContext = () => {

    const { setUser, setIsChecking, setLoginError, setRegisterError, setOtpError, loginError, registerError, otpError, user } = useContext(AuthContext);

    const login = async (credentials) => {
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
        } catch (error) {
            setIsChecking(false);
            setLoginError(error?.response?.data?.msg);
        }
    }

    const logout = async () => {
        setIsChecking(true);
        setUser({});
        await AsyncStorage.removeItem('@uademe:token');
        setIsChecking(false);
    }

    const register = async (credentials) => {
        const { name, surname, email, password } = credentials;

        if (email.length === 0) return setRegisterError('El correo electrónico es obligatorio.');
        if (password.length < 6) return setRegisterError('Las contraseñas tienen un mínimo de 6 caractéres.');
        if (name.length === 0) return setRegisterError('El nombre es obligatorio.');
        if (surname.length === 0) return setRegisterError('El apellido es obligatorio.');

        credentials.email = `${credentials.email}@uade.edu.ar`;

        try {
            const { data } = await backend.post('/auth/register', credentials);
            setRegisterError('');

            return true
        } catch (error) {
            setRegisterError(error?.response?.data?.msg);
            return false;
        }
    }

    const verifyCode = async (credentials) => {
        const { otp } = credentials;
        if (otp.length < 6) return setOtpError('El código OTP es obligatorio y es de 6 dígitos.');

        credentials.email = `${credentials.email}@uade.edu.ar`;

        try {
            const { data } = await backend.post('/auth/verifyOtp', credentials);
            setOtpError('');

            return data;
        } catch (error) {
            setOtpError('');
            return false;
        }
    }

    return {
        login,
        logout,
        register,
        verifyCode,
        loginError,
        registerError,
        setRegisterError,
        otpError,
        user,
        setUser
    }
}