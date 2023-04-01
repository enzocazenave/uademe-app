import {
    View,
    Text
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CommunitiesScreen = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[{ paddingTop: top }]}>
            <Text>CommunitiesScreen</Text>
        </View>
    )
}