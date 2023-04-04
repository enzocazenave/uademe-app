import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const TabButton = ({ screen, title, icon, isFocused }) => {
    const navigation = useNavigation();

    const onPress = () => {
        if (screen !== 'ProfileStack') return navigation.navigate(screen);
        navigation.navigate('ProfileStack', { screen: 'ProfileScreen' });
    }

    return (
        <TouchableOpacity
            onPress={ onPress }
            style={ styles.button }
            activeOpacity={ 0.4 }
        >
            {(screen !== 'ProfileStack')
            ? (
                <Icon
                    size={ 35 }
                    name={ (isFocused ? icon.focused : icon.notFocused) }
                    color={ (isFocused ? icon.color : null) }
                />
            )
            : (
                <View style={ [styles.imageContainer,  isFocused && { borderWidth: 1 }]}>
                    <Image
                        style={ styles.image }
                        source={ { uri: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg' }}
                    />
                </View>
            )}
                
            { (isFocused) && <Text style={ styles.title }>{ title }</Text> }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
    },
    title: {
        fontSize: 11
    },  
    imageContainer: {
        borderRadius: 50,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        width: 31,
        height: 31,
        resizeMode: 'cover',
        borderRadius: 50,
    }
});