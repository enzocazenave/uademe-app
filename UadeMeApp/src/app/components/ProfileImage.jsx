import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import backend from '../../api/backend';
import { useAuthContext } from '../../hooks/useAuthContext';

const imagePickerConfig = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};

export const ProfileImage = ({ image }) => {

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

        const { data } = await backend.post(
            `/user/image/${ user._id }`, 
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
            setUploadedImage(image.uri);
            setProgress(0);
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

    return (
        <View style={ [styles.item, (imageCondition) && {borderColor: '#fff0'}] }>
            {imageCondition
                ? (
                    <TouchableOpacity
                        style={ styles.remove }
                        activeOpacity={ 0.8 }
                    >
                        <Icon
                            name="more-horiz"
                            size={ 23 }
                            color="#fff"
                        />
                    </TouchableOpacity>
                )
                : (
                    <TouchableOpacity
                        style={ styles.add }
                        onPress={ uploadImage }
                        activeOpacity={ 0.8 }
                    >
                        <Icon
                            name="add"
                            size={ 25 }
                            color="#fff"
                        />
                    </TouchableOpacity>
                )
            }
            {progress !== 0 && (
                <Text style={{
                    textAlign: 'center',
                    padding: 10
                }}>
                    { progress } %
                </Text>
            )}
            {progress == 0 && image && (
                <Image
                    source={{ uri: image }}
                    style={ styles.image }
                />
            )}
            {progress == 0 && uploadedImage && (
                <Image
                    source={{ uri: uploadedImage }}
                    style={ styles.image }
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#bbb'
    },
    add: {
        backgroundColor: '#1778AF',
        position: 'absolute',
        padding: 2,
        borderRadius: 50,
        bottom: -10,
        right: -10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    remove: {
        backgroundColor: '#777',
        position: 'absolute',
        padding: 2,
        borderRadius: 50,
        bottom: -10,
        right: -10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 8,
    }
})