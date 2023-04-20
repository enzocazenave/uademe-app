import { useCallback, useEffect, useState } from "react"
import backend from "../api/backend";
import { useAuthContext } from "./useAuthContext";

export const useCoupleScreen = () => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [lastUser, setLastUser] = useState({});
    const gender = 0;

    useEffect(() => {
        getUsers();
    }, [limit]);

    const getUsers = async() => {
        const { data } = await backend.get(`/couple/users/${ user._id }?limit=${ limit }`);
        if (data.users.length == 0) return;
        setUsers((previousUsers) => [...previousUsers, ...data.users]);
    }

    const handleNextUser = () => {
        setUsers((prevUsers) => {
            const slicedArray = prevUsers.slice(1);

            if (slicedArray.length == 0) {
                setLastUser(prevUsers[0]);
            }

            return slicedArray;
        });
    }

    const match = async(userId) => {
        await backend.post(`/couple/match/${ userId }`, { userId: user._id });
    }

    const noMatch = async(userId) => {
        await backend.post(`/couple/nomatch/${ userId }`, { userId: user._id });
    }

    return {
        users,
        handleNextUser,
        match,
        noMatch,
        lastUser
    }
}