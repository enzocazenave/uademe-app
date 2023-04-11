import { useState } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CoupleQuestions } from '../components';
const { height: screenHeight } = Dimensions.get('screen');

const imagesArray = [
    { url: 'https://cdn.discordapp.com/attachments/1008885821027405958/1091610974768865401/Captura_de_pantalla_2023-04-01_a_las_03.32.06.png', id: 0 },
    { url: 'https://cdn.discordapp.com/attachments/1008885821027405958/1091820734654992404/Captura_de_pantalla_2023-04-01_a_las_17.25.37.png', id: 1 }, 
    { url: 'https://cdn.discordapp.com/attachments/1008885821027405958/1091820903878381578/Captura_de_pantalla_2023-04-01_a_las_17.26.09.png', id: 2 }
]

export const CoupleScreen = () => {
    const [images, setImages] = useState(imagesArray);
    const [currentImage, setCurrentImage] = useState(0);
    const { user } = useAuthContext();

    return (
        <View style={ styles.container }>
            {(true)
                ? <CoupleQuestions />
                : (
                    <TouchableOpacity
                        activeOpacity={ 1 }
                        onPress={ () => setCurrentImage((prev) => {
                            if (prev + 1 == images.length) return 0;
                            return prev + 1;
                        })}
                        style={ styles.card }
                    >
                        <ImageBackground
                            source={{ uri: images[currentImage].url }}
                            fadeDuration={ 500 }
                            style={ styles.cardProfileMainImage }
                            imageStyle={{ borderRadius: 8 }}
                        >
                            <View style={ styles.imagesIndicatorContainer}>
                                <View style={ styles.imagesIndicator }>
                                    {images.map(image => (
                                        <View key={ image.id } style={ [styles.image, (image.id == currentImage) && styles.imageSelected] }></View>
                                    ))}
                                </View>
                            </View>
                                    
                            <LinearGradient
                                colors={['transparent','#000']}  
                                style={ styles.cardControls }
                            >
                                <View style={{ gap: 7 }}>
                                    <Text style={ styles.cardName }>Enzo <Text style={ styles.cardAge }>19</Text></Text>
                                    <View style={ styles.cardOnline }>
                                        <View style={ styles.cardOnlineCircle }></View>
                                        <Text style={ styles.cardOnlineText }>Está online</Text>
                                    </View>
                                    <Text style={ styles.cardBiography }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti omnis amet iusto voluptatibus. Numquam?</Text>
                                </View>
                                    
                                <View style={ styles.cardReactions }>
                                    <TouchableOpacity
                                        style={ styles.noMatch }
                                        activeOpacity={ 0.7 }
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
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