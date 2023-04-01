import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoupleScreen } from '../app/screens';
import { LoginScreen, RegisterScreen, VerifyScreen, WelcomeScreen } from '../auth/screens';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false, /*animation: 'fade_from_bottom'*/  }} >
            {(false)
                ? (<>
                    <Stack.Screen name="CoupleScreen" component={ CoupleScreen } />
                </>)
                : (<>
                    <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                    <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                    <Stack.Screen name="VerifyScreen" component={ VerifyScreen } />
                    <Stack.Screen name="WelcomeScreen" component={ WelcomeScreen } />

                </>)
            }
        </Stack.Navigator>
    )
}