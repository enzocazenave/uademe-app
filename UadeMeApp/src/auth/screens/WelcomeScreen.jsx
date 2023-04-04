import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFade } from '../../hooks/useFade';

export const WelcomeScreen = ({ navigation, route }) => {

    const { top } = useSafeAreaInsets();
    const { setUser, resetError } = useContext(AuthContext);
    const { opacity, fadeIn } = useFade();

    useEffect(() => {
        fadeIn();
    }, []);

    const Continue = async() => {
        await AsyncStorage.setItem('@uademe:token', route.params.token);
        delete route.params.token;
        setUser(route.params);
        resetError();
    }

    return (
        <Animated.View style={[ styles.container, { paddingTop: top + 10, opacity: opacity }]}>
            <View style={ styles.header }>
                <Text style={ styles.headerText }>🌐 UadeMe</Text>
            </View>

            <View style={ styles.centerContainer }>
                <Text style={ styles.centerContainerTitle }>
                    Tu cuenta ha sido verificada
                </Text>
                
                <Animatable.View
                    animation="fadeInUp"
                    delay={ 300 }
                    duration={ 500 }
                >
                    <Icon
                        name="checkmark-circle-outline"
                        size={ 75 }
                        style={ styles.icon }
                    />
                </Animatable.View>

                <View style={{ gap: 10 }}>
                    <Text style={ styles.text }>
                        Te damos la bienvenida a <Text style={ styles.textBold } >UadeMe</Text>, la red social exclusiva para los alumnos de <Text style={ styles.textBold } >UADE</Text>.
                    </Text>
                    <Text style={ styles.text }>
                        Como te mencionamos anteriormente, aquí podrás hacer amigos, buscar pareja, conseguir apuntes de materias, mostrar tu vida y organizar tu carrera universitaria.
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={ 0.7 }
                style={ styles.submitButton }
                onPress={ Continue }
            > 
                <Text style={ styles.submitButtonText } >Continuar</Text>
            </TouchableOpacity>

            <View 
                style={ styles.imageContainer }
            >
                <Image
                    source={ require('../../imgs/auth.jpg') }
                    style={ styles.image }
                />
                <LinearGradient 
                    style={ styles.gradient }
                    colors={['#f0f0f0','transparent']}                
                />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        gap: 80,
        backgroundColor: '#f0f0f0'
    },
    header: {
        padding: 20,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 600
    },
    textContainer: {
        gap: 10
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        zIndex: 10
    },
    textBold: {
        fontWeight: 600
    },
    centerContainer: {
        gap: 30,
    },
    centerContainerTitle: {
        fontSize: 30,
        textAlign: 'center'
    },
    centerContainerCheck: {
        fontSize: 50,
        textAlign: 'center'
    },
    imageContainer: {
        marginHorizontal: -20,
        marginTop: -60
    },
    gradient: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
    },  
    image: {
        width: '130%',
        height: '70%'
    },
    submitButton: {
        backgroundColor: '#0a85cc',
        padding: 15,
        borderRadius: 5,
    },
    submitButtonText: {
        color: '#e7e7e7',
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center'
    },
    icon: {
        color: '#00b341',
        textAlign: 'center'
    }
});