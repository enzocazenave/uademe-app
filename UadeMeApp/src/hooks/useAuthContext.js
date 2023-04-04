import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {

    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const { setUser } = useContext(AuthContext);

    return {

    }
}