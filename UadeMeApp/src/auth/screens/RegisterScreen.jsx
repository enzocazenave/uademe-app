import { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useForm } from '../../hooks/useForm';

const initialForm = {
    name: 'Enzo',
    surname: 'Cazenave',
    email: 'ecazenave',
    password: 'enzo24feb'
}

export const RegisterScreen = ({ navigation }) => {

    const { top } = useSafeAreaInsets();
    const [focus, setFocus] = useState({ name: false, surname: false, email: false, password: false });
    const { register, registerError } = useAuthContext();
    const { name, surname, email, password, onInputChange } = useForm(initialForm);
    const [registerChecking, setRegisterChecking] = useState(false);

    const changeFocus = (input, bool) => {
        setFocus((prevState) => ({
            ...prevState,
            [input]: bool
        }));
    }

    const Login = () => {
        navigation.navigate('LoginScreen');
    }

    const submit = () => {
        setRegisterChecking(true);
        register({ name, surname, email, password }).then(res => {
            setRegisterChecking(false)
            if (res) navigation.navigate('VerifyScreen', { name, surname, email, password })
        })
    }

    return (
        <View style={[ styles.container, { paddingTop: top + 10 }]}>
            {(registerChecking)
                ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#00f" />
                    </View>
                )
                : (
                    <>
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
                            <Text style={ styles.formTitle }>Creá tu cuenta</Text>

                            <TextInput
                                style={[ styles.input, focus.name && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}
                                placeholder="Nombre"
                                onFocus={ () => changeFocus('name', true) }
                                onBlur={ () => changeFocus('name', false) }
                                value={ name }
                                onChangeText={ (text) => onInputChange(text, 'name') }
                            />

                            <TextInput
                                style={[ styles.input, focus.surname && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}
                                placeholder="Apellido"
                                onFocus={ () => changeFocus('surname', true) }
                                onBlur={ () => changeFocus('surname', false) }
                                value={ surname }
                                onChangeText={ (text) => onInputChange(text, 'surname') }
                            />

                            <View style={ [styles.emailInputContainer, focus.email && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}>
                                <TextInput
                                    style={ styles.emailInput }
                                    placeholder="Usuario "
                                    onFocus={ () => changeFocus('email', true) }
                                    onBlur={ () => changeFocus('email', false) }
                                    value={ email }
                                    onChangeText={ (text) => onInputChange(text, 'email') }
                                />
                                <Text style={ styles.emailDomain }>
                                    @uade.edu.ar
                                </Text>    
                            </View>

                            <TextInput
                                style={[ styles.input, focus.password && { borderColor: '#0a85cc', borderWidth: 0.5 } ]}
                                placeholder="Contraseña"
                                secureTextEntry
                                onFocus={ () => changeFocus('password', true) }
                                onBlur={ () => changeFocus('password', false) }
                                value={ password }
                                onChangeText={ (text) => onInputChange(text, 'password') }
                            />

                            <TouchableOpacity
                                activeOpacity={ 0.7 }
                                style={ styles.submitButton }
                                onPress={ submit }
                            > 
                                <Text style={ styles.submitButtonText } >Crear cuenta</Text>
                            </TouchableOpacity>

                            { (registerError) && <Text style={ styles.errorText }>{ registerError }</Text> }

                            <TouchableOpacity 
                                activeOpacity={ 0.7 }
                                onPress={ Login }
                            >
                                <Text style={ styles.register }>¿Ya tienes cuenta? Inicia sesión</Text>
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
                    </>
                )
            }
            
        </View>
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
    register: {
        textAlign: 'center',
        color: '#04517d'
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