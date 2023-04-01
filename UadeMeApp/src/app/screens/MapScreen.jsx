import {
    View,
    Text
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const MapScreen = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[{ paddingTop: top }]}>
            <Text>MapScreen</Text>
        </View>
    )
}