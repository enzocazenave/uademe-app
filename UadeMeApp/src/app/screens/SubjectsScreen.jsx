import {
    View,
    Text
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SubjectsScreen = () => {
    const { top } = useSafeAreaInsets();

    return (
        <View style={[{ paddingTop: top }]}>
            <Text>SubjectsScreen</Text>
        </View>
    )
}