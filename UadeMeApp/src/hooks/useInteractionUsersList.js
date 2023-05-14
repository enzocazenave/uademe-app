import { useEffect, useState } from "react";
import backend from "../api/backend";
import { useAuthContext } from "./useAuthContext";

export const useInteractionUsersList = ({ match }) => {
    const { user } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUsers().finally(() => {
            setIsLoading(false);
        })
    }, [match]);

    const getUsers = async () => {
        const { data } = await backend.get(`/couple/interacted-users/${user._id}/${match}`);
        setUsers(data.interactedUsers);
    }

    return {
        users,
        isLoading
    }
}