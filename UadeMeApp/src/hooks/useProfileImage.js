import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import backend from "../api/backend";
import { launchImageLibrary } from "react-native-image-picker";

const imagePickerConfig = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};

export const useProfileImage = ({ imageToShow }) => {
    const [uploadedImage, setUploadedImage] = useState();
    const [image, setImage] = useState(imageToShow);
    const [progress, setProgress] = useState(0);
    const { user } = useAuthContext();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setImage(imageToShow)
    }, [imageToShow]);

    const uploadImageToS3 = async (image) => {
        const { type, fileName, uri } = image;
        const formData = new FormData();

        formData.append('image', {
            name: fileName,
            type,
            uri
        });

        const headers = { Accept: 'application/json', 'Content-Type': 'multipart/form-data' }

        setProgress(1);

        const { data } = await backend.post(
            `/user/image/${user._id}`,
            formData,
            {
                headers,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);

                    if (percent < 100) {
                        setProgress(percent);
                    }
                }
            }
        );

        if (data.image) {
            setProgress(100);

            setTimeout(() => {
                setUploadedImage(data.image);
                setProgress(0);
            }, 250);
        }
    }

    const uploadImage = () => {
        launchImageLibrary(imagePickerConfig, (response) => {
            if (response.didCancel) return;
            const { width, height, fileSize } = response.assets[0];
            if (width == 0 || height == 0 || fileSize == 0) return;

            uploadImageToS3(response.assets[0]);
        });
    }

    const removeImage = async () => {
        const { data } = await backend.delete(`/user/image/${user._id}/${image?.id || uploadedImage?.id}`);
        if (data.ok) {
            setIsOpen(false);
            setUploadedImage('');
            setImage('');
        }
    }

    const imageCondition = image || uploadedImage;

    return {
        //* PROPIEDADES
        uploadedImage,
        progress,
        imageCondition,
        image,
        isOpen,

        //* METODOS
        uploadImage,
        removeImage,
        setIsOpen
    }
}