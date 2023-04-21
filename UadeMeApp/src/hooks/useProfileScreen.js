import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { getAgeFromDate } from "../helpers/getAgeFromDate";
import backend from "../api/backend";

export const useProfileScreen = () => {
    
    const { user } = useAuthContext();
    const [fullUser, setFullUser] = useState({});
    const [images, setImages] = useState(fullUser.profile_images || []);
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti omnis amet iusto voluptatibus. Numquam?');
    
    const age = useMemo(() => {
        if (user.birthdate) return getAgeFromDate(user.birthdate);
        return 0;
    }, [user.birthdate]);

    useEffect(() => {
        getUser();
    }, [user._id]);

    const getUser = async() => {
        const { data } = await backend.get(`/user/${ user._id }`);
        setFullUser(data.user);
        setImages(data.user.profile_images);
    }
    
    return {
        //* PROPERTIES *//
        user,
        age,
        about,
        images,
    
        //* METHODS *//
        setAbout
    }
}