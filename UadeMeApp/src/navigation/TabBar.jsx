import { StyleSheet, View } from 'react-native';
import { TabButton } from './TabButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const icons = {
    CoupleStack: {
        focused: 'heart',
        notFocused: 'heart-outline',
        color: '#E50E0E'
    },
    CommunitiesScreen: {
        focused: 'people',
        notFocused: 'people-outline',
        color: '#0F7ED5'
    },
    SubjectsScreen: {
        focused: 'document',
        notFocused: 'document-outline',
        color: '#ECD25C'
    },
    MapScreen: {
        focused: 'location',
        notFocused: 'location-outline',
        color: '#098B21'
    },
    ProfileStack: {
        focused: 'person',
        notFocused: 'person-outline',
        color: '#000'
    }
}

export const TabBar = ({ state, descriptors, }) => {

    const { bottom } = useSafeAreaInsets();

    return (
        <View
            style={[styles.container, { paddingBottom: bottom }]}
        >
            {state.routes.map((route, index) => {
                const screen = route.name;
                const title = descriptors[route.key].options.tabBarLabel;
                const isFocused = state.index === index;

                return (
                    <TabButton
                        key={index}
                        screen={screen}
                        title={title}
                        icon={icons[screen]}
                        isFocused={isFocused}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 0,
        bottom: 0,
        left: 0,
        height: 90,
        width: '100%',
        backgroundColor: '#f0f0f0'
    }
});