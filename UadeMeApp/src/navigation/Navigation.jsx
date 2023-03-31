import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CoupleScreen } from '../app/screens';
import { LoginScreen, RegisterScreen } from '../auth/screens';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {(false)
                ? (<>
                    <Stack.Screen name="CoupleScreen" component={ CoupleScreen } />
                </>)
                : (<>
                    <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
                    <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                </>)
            }
        </Stack.Navigator>
    )
}