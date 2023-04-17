import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useCouple } from "../../hooks/useCouple";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAgeFromDate } from '../../helpers/getAgeFromDate';
const { height: screenHeight } = Dimensions.get('screen');

export const CoupleCard = ({ handleNextImage, handleNextUser, currentUser }) => {
    return (
        <TouchableOpacity
            activeOpacity={ 1 }
            onPress={ handleNextImage }
            style={ styles.card }
        >
            <ImageBackground
                source={{ uri: currentUser?.profileImages[currentUser.currentImage].url }}
                fadeDuration={ 500 }
                style={ styles.cardProfileMainImage }
                imageStyle={{ borderRadius: 8 }}
            >
                <View style={ styles.imagesIndicatorContainer}>
                    <View style={ styles.imagesIndicator }>
                        {currentUser?.profileImages.map(image => (
                            <View key={ image.id } style={ [styles.image, (image.id == currentUser?.profileImages[currentUser.currentImage].id) && styles.imageSelected] }></View>
                        ))}
                    </View>
                </View>
                        
                <LinearGradient
                    colors={['transparent','#000']}  
                    style={ styles.cardControls }
                >
                    <View style={{ gap: 7 }}>
                        <Text style={ styles.cardName }>{ currentUser?.name } <Text style={ styles.cardAge }>{ getAgeFromDate(currentUser?.birthdate) }</Text></Text>
                        <View style={ styles.cardOnline }>
                            { currentUser?.isOnline
                                ? <View style={ styles.cardOnlineCircle }></View>
                                : <View style={ styles.cardOfflineCircle }></View>
                            }
                            <Text style={ styles.cardOnlineText }>
                                { currentUser?.isOnline
                                    ? 'Está online'
                                    : 'No está online'
                                }
                            </Text>
                        </View>
                        <Text style={ styles.cardBiography }>{ currentUser?.about }</Text>
                    </View>
                            
                    <View style={ styles.cardReactions }>
                        <TouchableOpacity
                            style={ styles.noMatch }
                            activeOpacity={ 0.7 }
                            onPress={ handleNextUser }
                        >
                            <Icon
                                name="close"
                                size={ 35 }
                                color="#E2583A"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={ styles.match }
                            activeOpacity={ 0.7 }
                            onPress={ handleNextUser }
                        >
                            <Icon
                                name="favorite-outline"
                                size={ 35 }
                                color="#59CC91"
                            />
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        height: screenHeight * 0.75,
    },
    cardProfileMainImage: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        borderRadius: 8,
        justifyContent: 'flex-end'
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
    }
})