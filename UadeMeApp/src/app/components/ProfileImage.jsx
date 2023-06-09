import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useProfileImage } from '../../hooks/useProfileImage';

export const ProfileImage = ({ imageToShow }) => {

    const { uploadedImage, imageCondition, progress, image, isOpen, removeImage, setIsOpen, uploadImage, storeImage, isStored } = useProfileImage({ imageToShow });

    return (
        <View style={[styles.item, (imageCondition) && { borderColor: '#fff0', gap: isOpen ? 8 : 0 }]}>
            {imageCondition
                ? (
                    <TouchableOpacity
                        style={styles.remove}
                        activeOpacity={0.8}
                        onPress={() => setIsOpen(!isOpen)}
                    >
                        {isOpen
                            ? (
                                <Icon
                                    name="arrow-back"
                                    size={23}
                                    color="#fff"
                                />
                            )
                            : (
                                <Icon
                                    name="more-horiz"
                                    size={23}
                                    color="#fff"
                                />
                            )
                        }
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
                                source={{ uri: image.url }}
                                style={styles.image}
                                blurRadius={isStored && !isOpen ? 20 : 0}
                            />
                        )}
                        {uploadedImage && (
                            <Image
                                source={{ uri: uploadedImage.url }}
                                style={styles.image}
                                blurRadius={isStored && !isOpen ? 20 : 0}
                            />
                        )}
                        {isStored && !isOpen && (
                            <View style={styles.stored}>
                                <Icon
                                    name="inventory"
                                    size={22}
                                    color="#cbcbcb"
                                />
                                <Text style={styles.storedText}>
                                    Archivado
                                </Text>
                            </View>
                        )}
                    </>
                )
            }

            {(isOpen) && (
                <View style={styles.menu}>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={storeImage}
                    >
                        <Text style={[styles.menuItemText, { color: '#00f' }]}>{
                            isStored ? 'Desarchivar' : 'Archivar'
                        }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={removeImage}
                    >
                        <Text style={[styles.menuItemText, { color: '#f00' }]}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
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
    menu: {
        width: '100%',
        flexDirection: 'column-reverse',
        backgroundColor: '#ddd',
        borderRadius: 8
    },
    menuItem: {
        padding: 7
    },
    menuItemText: {
        fontSize: 17,
        textAlign: 'center'
    },
    stored: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 8,
        gap: 10
    },
    storedText: {
        color: '#cbcbcb',
        fontWeight: 600,
        fontSize: 17,
    }
})