import { useEffect, useState } from 'react';
import {
    View,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useForm } from '../../hooks/useForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFade } from '../../hooks/useFade';

const initialForm = {
    email: '',
    password: ''
}

export const LoginScreen = ({ navigation }) => {

    const { top } = useSafeAreaInsets();
    const [focus, setFocus] = useState({ email: false, password: false });
    const { email, password, onInputChange } = useForm(initialForm);
    const { login, loginError } = useAuthContext();
    const { opacity, fadeIn } = useFade();

    useEffect(() => {
        fadeIn();
    }, []);

    const changeFocus = (input, bool) => {
        setFocus((prevState) => ({
            ...prevState,
            [input]: bool
        }));
    }

    const Register = () => {
        navigation.navigate('RegisterScreen');
    }

    const submit = () => {
        login({ email, password });
    }

    return (
        <TouchableWithoutFeedback
            onPress={ Keyboard.dismiss }
        >
            <Animated.View style={[ styles.container, { paddingTop: top + 10, opacity: opacity }]}>
                <View>
                    <View style={ styles.header }>
                        <Text style={ styles.headerText }>🌐 UadeMe</Text>
                    </View>

                    <View style={ styles.textContainer }>
                        <Text style={[ styles.text, styles.textBold ]}>Diseñado exclusivamente para alumnos de UADE.</Text>
                        <Text style={ styles.text }>
                            ¿Querés hacer amigos, conseguir apuntes de materias, buscar pareja, organizarte y saber más sobre nuestra universidad?
                            Estás en la aplicación indicada.
                        </Text>
                    </View>
                </View>

                <View style={ styles.form }>
                    <Text style={ styles.formTitle }>Iniciá sesión</Text>

                    <View style={ [styles.emailInputContainer, focus.email && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}>
                        <TextInput
                            style={ styles.emailInput }
                            placeholder="Usuario "
                            onFocus={ () => changeFocus('email', true) }
                            onBlur={ () => changeFocus('email', false) }
                            placeholderTextColor={ "#ccc" }
                            value={ email }
                            onChangeText={ (text) => onInputChange(text, 'email') }
                            />
                        <Text style={ styles.emailDomain }>
                            @uade.edu.ar
                        </Text>    
                    </View>

                    <TextInput
                        style={[ styles.passwordInput, focus.password && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}
                        placeholder="Contraseña"
                        secureTextEntry
                        onFocus={ () => changeFocus('password', true) }
                        onBlur={ () => changeFocus('password', false) }
                        placeholderTextColor={ "#ccc" }
                        value={ password }
                        onChangeText={ (text) => onInputChange(text, 'password') }
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        style={ styles.submitButton }
                        onPress={ submit }
                    > 
                        <Text style={ styles.submitButtonText } >Iniciar sesión</Text>
                    </TouchableOpacity>

                    { (loginError) && <Text style={ styles.errorText }>{ loginError }</Text> }

                    <TouchableOpacity 
                        activeOpacity={ 0.7 }
                        onPress={ Register }
                    >
                        <Text style={ styles.register }>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </View>

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
        </TouchableWithoutFeedback>

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
        fontSize: 16
    },
    textBold: {
        fontWeight: 500
    },
    form: {
        gap: 20
    },
    formTitle: {
        fontSize: 35,
        fontWeight: 600,
        textAlign: 'center',
    },
    emailInputContainer: {
        flexDirection: 'row',
        borderRadius: 5, 
        backgroundColor: '#e7e7e7',
        padding: 15,
        borderColor: '#333',
        borderWidth: 0.5
    },
    emailInput: {
        fontSize: 18,
    },
    emailDomain: {
        fontSize: 18,
        color: '#555'
    },
    passwordInput: {
        fontSize: 18,
        borderRadius: 5, 
        backgroundColor: '#e7e7e7',
        padding: 15,
        borderColor: '#333',
        borderWidth: 0.5
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
    register: {
        textAlign: 'center',
        color: '#04517d'
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
    errorText: {
        fontSize: 15,
        color: '#f00',
        textAlign: 'center'
    }
});