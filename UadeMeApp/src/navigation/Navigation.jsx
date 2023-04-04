import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CommunitiesScreen, CoupleScreen, SubjectsScreen, MapScreen, ProfileScreen } from '../app/screens';
import { LoginScreen, RegisterScreen, VerifyScreen, WelcomeScreen } from '../auth/screens';
import { TabBar } from './TabBar';
import { Header } from './Header';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {

    const { user } = useContext(AuthContext);

    return (<>
        {(user.id)
            ? (
                <Tab.Navigator
                    screenOptions={{
                        header:  ({ navigation, route, options }) => {
                            return <Header screen={ route.name } />
                        }
                    }}
                    tabBar={ (props) => <TabBar { ...props } /> }
                >
                    <Tab.Screen 
                        name="CoupleScreen" 
                        component={ CoupleScreen }
                        options={{ tabBarLabel: 'Match' }}
                    />
                    <Tab.Screen 
                        name="CommunitiesScreen" 
                        component={ CommunitiesScreen }
                        options={{ tabBarLabel: 'Comunidades' }} 
                    />
                    <Tab.Screen 
                        name="SubjectsScreen" 
                        component={ SubjectsScreen }
                        options={{ tabBarLabel: 'Materias' }} 
                    />
                    <Tab.Screen 
                        name="MapScreen" 
                        component={ MapScreen } 
                        options={{ tabBarLabel: 'Mapa' }}
                    />
                    <Tab.Screen 
                        name="ProfileScreen" 
                        component={ ProfileScreen } 
                        options={{ tabBarLabel: 'Perfil' }}
                    />
                </Tab.Navigator>
            )
            : (
                <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, /*animation: 'fade_from_bottom'*/  }} >
                    <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                    <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                    <Stack.Screen name="VerifyScreen" component={ VerifyScreen } />
                    <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } />
                </Stack.Navigator>
            )
        }
        

    </>)
}