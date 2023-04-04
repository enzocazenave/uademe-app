import { useEffect, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useForm } from '../../hooks/useForm';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFade } from '../../hooks/useFade';

const CountDown = () => {
    const [countdown, setCountdown] = useState(59);
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
        }
    }, [countdown]);

    return (
        <TouchableOpacity
            style={ styles.sendAgain }
            activeOpacity={ 0.7 }
            disabled={ countdown > 0 }
        >
            <Text
                style={ [styles.sendAgainText, countdown > 0 && styles.sendAgainTextDisabled] }
            >
                Reenviar el código { (countdown > 0) && ( <Text>en { countdown } segundos.</Text>) }
            </Text>
        </TouchableOpacity>
    )
}

const initialForm = {
    otp: ''
}

export const VerifyScreen = ({ navigation, route }) => {

    const { top } = useSafeAreaInsets();
    const [focus, setFocus] = useState({ code: false });
    const { onInputChange, otp } = useForm(initialForm);
    const { verifyCode: verifyOtp, otpError, setRegisterError } = useAuthContext();
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

    const verifyCode = () => {
        verifyOtp({ ...route.params, otp }).then(res => {
            if (res) return navigation.navigate('WelcomeScreen', res.session);
            if (res === false) {
                navigation.navigate('RegisterScreen');
                setRegisterError('El código OTP ingresado es inválido.')
                return;
            }
            
        })
    }

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
        >
            <Animated.View style={[ styles.container, { paddingTop: top + 10, opacity: opacity }]}>
                <View>
                    <View style={ styles.header }>
                        <Text style={ styles.headerText }>🌐 UadeMe</Text>
                    </View>

                    <View style={ styles.textContainer }>
                        <Text style={[ styles.text, styles.textBold ]}>Diseñado exclusivamente para alumnos de UADE.</Text>
                        <Text style={ styles.text }>
                            Hemos enviado un código de verificación de 6 dígitos a 
                            <Text style={{ fontWeight: 600 }}> ecazenave@uade.edu.ar</Text>
                            . Ve a buscarlo en tu bandeja de entrada o correo no deseado e ingrésalo para que verifiquémos que no eres un robot.
                        </Text>
                    </View>
                </View>

                <View style={ styles.form }>
                    <Text style={ styles.formTitle }>Código OTP</Text>

                    <TextInput
                        style={[ styles.input, focus.code && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}
                        placeholder="Código"
                        keyboardType="number-pad"
                        onFocus={ () => changeFocus('code', true) }
                        onBlur={ () => changeFocus('code', false) }
                        onChangeText={ (text) => onInputChange(text, 'otp') }
                        placeholderTextColor={ "#ccc" }
                        value={ otp }
                    />

                    <TouchableOpacity
                        activeOpacity={ 0.7 }
                        style={ styles.submitButton }
                        onPress={ verifyCode }
                    > 
                        <Text style={ styles.submitButtonText } >Verificar código</Text>
                    </TouchableOpacity>

                    { (otpError) && <Text style={ styles.errorText }>{ otpError }</Text> }

                    <CountDown />
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
        gap: 30,
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
        gap: 20
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
        flex: 1,
        fontSize: 18
    },
    emailDomain: {
        flex: 2,
        fontSize: 18,
        color: '#555'
    },
    input: {
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
    sendAgain: {
        padding: 15
    },
    sendAgainText: {
        color: '#04517d',
        textAlign: 'center',
        fontSize: 16
    },  
    sendAgainTextDisabled: {
        color: '#88AABC'
    },
    imageContainer: {
        marginHorizontal: -20,
        marginTop: -30
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