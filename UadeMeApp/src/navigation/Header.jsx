import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = ({ screen, navigation }) => {
    const { top } = useSafeAreaInsets();
    const { name } = useRoute();

    if (screen == 'CoupleScreen') return (
        <View style={[stylesCouple.container, { paddingTop: top + 5 }]}>
            <View style={stylesCouple.titleContainer}>
                <TouchableOpacity
                    style={stylesCouple.settings}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('CoupleStack', { screen: 'SettingsCoupleScreen' })}
                >
                    <Icon
                        name="options-outline"
                        size={25}
                    />
                </TouchableOpacity>
                <Icon
                    name="globe-outline"
                    size={20}
                    color="#1778AF"
                />
                <Text style={stylesCouple.title}>
                    UadeMe
                </Text>
            </View>
        </View>
    )

    if (screen == 'ProfileScreen' || screen == 'SettingsScreen' || screen == 'SettingsCoupleScreen' || screen == 'InteractionUsersListScreen') return (
        <View style={[stylesProfile.container, { paddingTop: top + 5 }]}>

            <View style={stylesProfile.titleContainer}>
                {(screen == 'ProfileScreen') &&
                    <TouchableOpacity
                        style={stylesProfile.settings}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ProfileStack', { screen: 'SettingsScreen' })}
                    >
                        <Icon
                            name="settings-outline"
                            size={25}
                        />
                    </TouchableOpacity>
                }
                {(screen == 'SettingsCoupleScreen' || screen == 'InteractionUsersListScreen') && (
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 0 }}
                        activeOpacity={0.7}
                        onPress={() => { navigation.navigate('CoupleScreen', { refresh: screen == 'SettingsCoupleScreen' }) }}
                    >
                        <Icon
                            name="arrow-back-outline"
                            size={25}
                        />
                    </TouchableOpacity>
                )}
                {(screen == 'SettingsScreen') && (
                    <TouchableOpacity
                        style={{ position: 'absolute', left: 0 }}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ProfileScreen')}
                    >
                        <Icon
                            name="arrow-back-outline"
                            size={25}
                        />
                    </TouchableOpacity>
                )}
                <Icon
                    name="globe-outline"
                    size={20}
                    color="#1778AF"
                />
                <Text style={stylesProfile.title}>
                    UadeMe
                </Text>
            </View>
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
        right: 0
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
        paddingBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
    },
    settings: {
        position: 'absolute',
        right: 0
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