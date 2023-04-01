import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = ({ title }) => {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

    return (
        <View style={ [styles.container, { paddingTop: top + 5}] }>
            <Icon
                name="settings-outline"
                size={ 25 }
            />
            <Text style={ styles.title }>UadeMe</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row'
    },
    title: {
        fontSize: 25
    }
});