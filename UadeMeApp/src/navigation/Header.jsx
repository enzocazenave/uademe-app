import Icon from 'react-native-vector-icons/Ionicons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = ({ screen }) => {
    const { top } = useSafeAreaInsets();

    if (screen == 'CoupleScreen') return (
        <View style={ [stylesCouple.container, { paddingTop: top + 5}] }>
            <Icon
                style={ stylesCouple.settings }
                name="options-outline"
                size={ 25 }
            />
            
            <View style={ stylesCouple.titleContainer }> 
                <Icon
                    name="globe-outline"
                    size={ 20 }
                    color="#1778AF"
                />
                <Text style={ stylesCouple.title }>
                    UadeMe
                </Text>
            </View>
        </View>
    )

    if (screen == 'ProfileScreen') return (
        <View style={ [stylesProfile.container, { paddingTop: top + 5}] }>
            
            <View style={ stylesProfile.titleContainer }> 
                <Icon
                    name="globe-outline"
                    size={ 20 }
                    color="#1778AF"
                />
                <Text style={ stylesProfile.title }>
                    UadeMe
                </Text>
            </View>
            
            <Icon
                style={ stylesProfile.settings }
                name="settings-outline"
                size={ 25 }
            />
        </View>
    )

    return <></>
}

const stylesCouple = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    settings: {
        position: 'absolute',
        right: 10,
        top: 54
    },
    titleContainer: {
        flex: 1,
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },  
    title: {
        fontSize: 25,
        color: '#1778AF',
        fontWeight: 600,
        gap: 20,
    }
});

const stylesProfile = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    titleContainer: {
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },  
    title: {
        fontSize: 25,
        color: '#1778AF',
        fontWeight: 600,
        gap: 20,
    }
});