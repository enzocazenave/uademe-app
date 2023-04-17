import { useEffect, useState } from "react"
import backend from "../api/backend";

export const useCouple = () => {

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(0);
    const [limit, setLimit] = useState(10);
    const missingUsers = users.length - currentUser;
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
        setCurrentUser((previousUser) => previousUser + 1);
        if (currentUser == limit - 2) setLimit((previousLimit) => previousLimit + 10);
    }

    const handleNextImage = () => {
        setUsers((previousUsers) => (
            previousUsers.map((user, index) => {
                if (index === currentUser) {
                    if (user.currentImage == user.profileImages.length) return { 
                        ...user,
                        ['currentImage']: 0
                    }

                    if (user.currentImage + 1 == user.profileImages.length) return { 
                        ...user,
                        ['currentImage']: 0
                    }
                    
                    return { 
                        ...user,
                        ['currentImage']: user.currentImage + 1
                    }              
                }

                return user;
            })
        ));
    }

    const match = async() => {

    }

    const noMatch = async() => {

    }

    return {
        users,
        currentUserIndex: currentUser,
        currentUser: users[currentUser],
        handleNextUser,
        handleNextImage,
        match,
        noMatch,
        missingUsers
    }
}