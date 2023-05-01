import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SettingsCoupleScreen, CommunitiesScreen, CoupleScreen, SubjectsScreen, MapScreen, ProfileScreen, SettingsScreen } from '../app/screens';
import { LoginScreen, RegisterScreen, VerifyScreen, WelcomeScreen } from '../auth/screens';
import { TabBar } from './TabBar';
import { Header } from './Header';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                gestureEnabled: false,
                header: ({ navigation, route }) => (
                    <Header screen={route.name} navigation={navigation} />
                ),
                animation: 'none'
            }}
        >
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="SettingsCoupleScreen" component={SettingsCoupleScreen} />
        </Stack.Navigator>
    )
}

const CoupleNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                gestureEnabled: false,
                header: ({ navigation, route }) => (
                    <Header screen={route.name} navigation={navigation} />
                ),
                animation: 'none'
            }}
        >
            <Stack.Screen name="CoupleScreen" component={CoupleScreen} />
            <Stack.Screen name="SettingsCoupleScreen" component={SettingsCoupleScreen} />
        </Stack.Navigator>
    )
}
export const Navigation = () => {

    const { user, isChecking } = useContext(AuthContext);

    if (isChecking) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#1778AF" />
        </View>
    )

    return (<>
        {(user?._id)
            ? (
                <Tab.Navigator
                    screenOptions={{
                        header: ({ navigation, route, options }) => (
                            <Header screen={route.name} navigation={navigation} />
                        )
                    }}
                    tabBar={(props) => <TabBar {...props} />}
                >
                    <Tab.Screen
                        name="CoupleStack"
                        component={CoupleNavigation}
                        options={{ tabBarLabel: 'Match' }}
                    />
                    <Tab.Screen
                        name="CommunitiesScreen"
                        component={CommunitiesScreen}
                        options={{ tabBarLabel: 'Comunidades' }}
                    />
                    <Tab.Screen
                        name="SubjectsScreen"
                        component={SubjectsScreen}
                        options={{ tabBarLabel: 'Materias' }}
                    />
                    <Tab.Screen
                        name="MapScreen"
                        component={MapScreen}
                        options={{ tabBarLabel: 'Mapa' }}
                    />
                    <Tab.Screen
                        name="ProfileStack"
                        component={ProfileNavigation}
                        options={{ tabBarLabel: 'Perfil' }}
                    />
                </Tab.Navigator>
            )
            : (
                <Stack.Navigator screenOptions={{ animation: 'none', headerShown: false, gestureEnabled: false /*animation: 'fade_from_bottom'*/ }} >
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    <Stack.Screen name="VerifyScreen" component={VerifyScreen} />
                    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                </Stack.Navigator>
            )
        }
    </>)
}