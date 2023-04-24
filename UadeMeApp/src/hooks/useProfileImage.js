import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import backend from "../api/backend";
import { launchImageLibrary } from "react-native-image-picker";

const imagePickerConfig = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};

export const useProfileImage = ({ image }) => {
    
    const [uploadedImage, setUploadedImage] = useState();
    const [progress, setProgress] = useState(0);
    const { user } = useAuthContext();

    const uploadImageToCloudinary = async(image) => {
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
            `/user/image/${ user._id }`, 
            formData, 
            { 
                headers,
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total);
                    console.log(`UPLOADING: ${ loaded }kb of ${ total }kb`)
                    if (percent < 100) {
                        setProgress(percent);
                    }
                }
            }
        );

        if (data.image) {
            setProgress(100);
            
            setTimeout(() => {
                setUploadedImage(image.uri);
                setProgress(0);
            }, 250)
        }
    }

    const uploadImage = () => {
        launchImageLibrary(imagePickerConfig, (response) => {
            if (response.didCancel) return;
            const { width, height, fileSize } = response.assets[0];
            if (width == 0 || height == 0 || fileSize == 0) return;

            uploadImageToCloudinary(response.assets[0]);
        });
    }

    const imageCondition = image || uploadedImage;
    
    return {
        //* PROPIEDADES
        uploadedImage,
        progress,
        imageCondition,

        //* METODOS
        uploadImage
    }
}