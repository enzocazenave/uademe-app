import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';

const imagePickerConfig = {
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
};

export const ProfileImage = ({ image }) => {

    const [uplodadImage, setUploadedImage] = useState();

    const uploadImage = () => {
        launchImageLibrary(imagePickerConfig, (response) => {
            setUploadedImage({ uri: response?.uri });
            console.log(response)
        })
        
    }

    return (
        <View style={ [styles.item, image && {borderColor: '#fff0'}] }>
            {image
                ? (
                    <TouchableOpacity
                        style={ styles.remove }
                        activeOpacity={ 0.8 }
                    >
                        <Icon
                            name="close"
                            size={ 25 }
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
            {image && (
                <Image
                    source={ { uri: image } }
                    style={ styles.image }
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        borderRadius: 10,
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
        borderRadius: 10,
    }
})