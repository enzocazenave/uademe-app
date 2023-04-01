import { useState } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

export const LoginScreen = ({ navigation }) => {

    const { top } = useSafeAreaInsets();
    const [focus, setFocus] = useState({ email: false, password: false });

    const changeFocus = (input, bool) => {
        setFocus((prevState) => ({
            ...prevState,
            [input]: bool
        }));
    }

    const Register = () => {
        navigation.navigate('RegisterScreen');
    }

    return (
        <View style={[ styles.container, { paddingTop: top + 10 }]}>
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
                />

                <TouchableOpacity
                    activeOpacity={ 0.7 }
                    style={ styles.submitButton }
                > 
                    <Text style={ styles.submitButtonText } >Iniciar sesión</Text>
                </TouchableOpacity>

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
        </View>
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
        fontSize: 18
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
    }
});