import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useAuthContext } from '../../hooks/useAuthContext';

export const SettingsScreen = () => {

    const  { logout } = useAuthContext();

    return (
        <View style={ styles.container }>
            <TouchableOpacity
                style={ styles.button }
                onPress={ logout }
            >
                <Icon
                    name="log-out-outline"
                    size={ 25 }
                    color={ "#f00" }
                />
                <Text style={ styles.buttonText }>Cerrar sesión</Text>
            </TouchableOpacity> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    button: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        backgroundColor: '#e6e6e6',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
    },  
    buttonText: {
        fontSize: 20,
    }
})  