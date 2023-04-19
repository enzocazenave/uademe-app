import { useCallback, useEffect, useState } from "react"
import backend from "../api/backend";

export const useCouple = () => {
    const [users, setUsers] = useState([]);
    const [limit, setLimit] = useState(10);
    const [lastUser, setLastUser] = useState({});
    const gender = 0;

    useEffect(() => {
        getUsers();
    }, [limit]);

    const getUsers = async() => {
        const { data } = await backend.get(`/couple/users/${ gender }?limit=${ limit }`);
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

    const match = async() => {

    }

    const noMatch = async() => {

    }

    return {
        users,
        handleNextUser,
        match,
        noMatch,
        lastUser
    }
}