import { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { getAgeFromDate } from "../helpers/getAgeFromDate";
import backend from "../api/backend";

export const useProfileScreen = () => {

    const { user } = useAuthContext();
    const [fullUser, setFullUser] = useState({});
    const [images, setImages] = useState(fullUser.profile_images || []);
    const [about, setAbout] = useState(fullUser.about || '');

    const age = useMemo(() => {
        if (user.birthdate) return getAgeFromDate(user.birthdate);
        return 0;
    }, [user.birthdate]);

    const haveToSave = useMemo(() => {
        return fullUser.about != about;
    }, [fullUser.about, about]);

    useEffect(() => {
        getUser();
    }, [user._id]);

    const getUser = async () => {
        const { data } = await backend.get(`/user/${user._id}`);
        setFullUser(data.user);
        setImages(data.user.profile_images);
        setAbout(data.user.about);
    }

    const changeAbout = async () => {
        const { data } = await backend.patch(`/user/about/${user._id}`, { about });
        setFullUser((currentFullUser) => ({
            ...currentFullUser,
            ['about']: data.about
        }));
    }

    return {
        //* PROPERTIES *//
        user,
        age,
        about,
        images,
        haveToSave,

        //* METHODS *//
        setAbout,
        changeAbout
    }
}