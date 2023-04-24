import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfileImage } from '../../hooks/useProfileImage';

export const ProfileImage = ({ image }) => {

    const { uploadImage, uploadedImage, imageCondition, progress } = useProfileImage({ image });

    return (
        <View style={[styles.item, (imageCondition) && { borderColor: '#fff0' }]}>
            {imageCondition
                ? (
                    <TouchableOpacity
                        style={styles.remove}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name="more-horiz"
                            size={23}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )
                : (
                    <TouchableOpacity
                        style={styles.add}
                        onPress={uploadImage}
                        activeOpacity={0.8}
                    >
                        <Icon
                            name="add"
                            size={25}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )
            }

            {progress > 0
                ? (
                    <View style={{
                        padding: 10,
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text>
                            {progress} %
                        </Text>
                    </View>
                )
                : (
                    <>
                        {image && (
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                            />
                        )}
                        {uploadedImage && (
                            <Image
                                source={{ uri: uploadedImage }}
                                style={styles.image}
                            />
                        )}
                    </>
                )
            }
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
        zIndex: 10,
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
        zIndex: 10,
        zIndex: 1
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        borderRadius: 8,
    },
})