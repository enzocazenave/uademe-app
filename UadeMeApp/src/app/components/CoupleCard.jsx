import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View, Text, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAgeFromDate } from '../../helpers/getAgeFromDate';
import { useRef, useState } from "react";
const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

const OUT_OF_SCREEN = screenWidth + 0.5 * screenWidth;

export const CoupleCard = ({ handleNextUser, user, isFirst, lastUser = false, noMatch, match }) => {

    const [currentImage, setCurrentImage] = useState(0);
    const swipe = useRef(new Animated.ValueXY()).current;

    const handleNextImage = () => {
        if (lastUser) return;

        setCurrentImage((prevCurrentImage) => {
            if (prevCurrentImage + 1 == user.profileImages.length) return 0;
            return prevCurrentImage + 1;
        });
    }

    const handleMatch = () => {
        Animated.timing(swipe.x, {
            duration: 500,
            toValue: OUT_OF_SCREEN,
            useNativeDriver: true
        }).start(handleNextUser);
        match(user._id);
    }

    const handleNoMatch = () => {
        Animated.timing(swipe.x, {
            duration: 500,
            toValue: - OUT_OF_SCREEN,
            useNativeDriver: true
        }).start(handleNextUser);
        noMatch(user._id);
    }

    const rotate = Animated.multiply(swipe.x, 1).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['8deg', '0deg', '-8deg']
    })

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={handleNextImage}
            style={[styles.card, isFirst && { transform: [...swipe.getTranslateTransform(), { rotate: rotate }] }]}
        >
            <ImageBackground
                source={{ uri: user?.profileImages[currentImage]?.url }}
                fadeDuration={500}
                style={[styles.cardProfileMainImage, { justifyContent: 'center' }]}
                imageStyle={{ borderRadius: 8 }}
                blurRadius={lastUser ? 35 : 0}
            >
                {(user.profileImages.length > 1) && (
                    <>{!lastUser && (
                        <View style={styles.imagesIndicatorContainer}>
                            <View style={styles.imagesIndicator}>
                                {user.profileImages.map(image => (
                                    <View key={image.id} style={[styles.image, (image.id == user.profileImages[currentImage].id) && styles.imageSelected]}></View>
                                ))}
                            </View>
                        </View>
                    )}</>
                )}

                {lastUser && (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>NO HAY MAS USUARIOS</Text>
                        <Text style={styles.paragraph}>
                            No hay mas usuarios registrados para mostrarte. Te recomendamos volver a revisar tus
                            <Text style={{ fontWeight: 800 }}> No Matcheados</Text> para ver si cámbias de opinión.
                        </Text>
                    </View>
                )}

                {!lastUser &&
                    <LinearGradient
                        colors={['transparent', '#000']}
                        style={styles.cardControls}
                    >
                        <View style={{ gap: 7 }}>
                            <Text style={styles.cardName}>{user?.name} <Text style={styles.cardAge}>{getAgeFromDate(user?.birthdate)}</Text></Text>
                            <View style={styles.cardOnline}>
                                {user?.isOnline
                                    ? <View style={styles.cardOnlineCircle}></View>
                                    : <View style={styles.cardOfflineCircle}></View>
                                }
                                <Text style={styles.cardOnlineText}>
                                    {user?.isOnline
                                        ? 'Está online'
                                        : 'No está online'
                                    }
                                </Text>
                            </View>

                            <Text style={styles.cardBiography}>{user?.about}</Text>
                        </View>

                        <Animated.View style={styles.cardReactions}>
                            <TouchableOpacity
                                style={styles.noMatch}
                                activeOpacity={0.7}
                                onPress={handleNoMatch}
                            >
                                <Icon
                                    name="close"
                                    size={35}
                                    color="#E2583A"
                                />
                            </TouchableOpacity>
                            <Text style={styles.cardSex}>
                                {user.genderYouSearch == 0 && 'Busca conocer hombres'}
                                {user.genderYouSearch == 1 && 'Busca conocer mujeres'}
                                {user.genderYouSearch == 2 && 'Bisexual'}
                            </Text>
                            <TouchableOpacity
                                style={styles.match}
                                activeOpacity={0.7}
                                onPress={handleMatch}
                            >
                                <Icon
                                    name="favorite-outline"
                                    size={35}
                                    color="#59CC91"
                                />
                            </TouchableOpacity>
                        </Animated.View>

                    </LinearGradient>
                }
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        height: screenHeight * 0.75,
        width: '100%'
    },
    cardProfileMainImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        borderRadius: 8,
        justifyContent: 'flex-end',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
    cardControls: {
        flex: 1,
        gap: 15,
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    cardReactions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    noMatch: {
        borderColor: '#E2583A',
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    match: {
        borderColor: '#59CC91',
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    cardName: {
        fontSize: 36,
        color: '#f0f0f0',
        fontWeight: 600
    },
    cardAge: {
        fontWeight: 400
    },
    cardBiography: {
        color: '#fff',
        fontWeight: 500,
        fontSize: 14
    },
    cardSex: {
        color: '#eee',
        fontWeight: 500,
        fontSize: 13
    },
    cardOnline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    cardOnlineCircle: {
        width: 11,
        height: 11,
        backgroundColor: '#59CC91',
        borderRadius: 50
    },
    cardOfflineCircle: {
        width: 11,
        height: 11,
        backgroundColor: '#E2583A',
        borderRadius: 50
    },
    cardOnlineText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 500
    },
    imagesIndicatorContainer: {
        flex: 1,
        padding: 10,
    },
    imagesIndicator: {
        width: '100%',
        flexDirection: 'row',
        gap: 10
    },
    image: {
        height: 3,
        flex: 1,
        backgroundColor: '#736F6A95',
        borderRadius: 50
    },
    imageSelected: {
        backgroundColor: '#f0f0f0'
    },
    textContainer: {
        gap: 10,
        padding: 5
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        fontWeight: 700
    },
    paragraph: {
        textAlign: 'center',
        fontSize: 17,
        color: '#f0f0f0',
        fontWeight: 500
    }
})