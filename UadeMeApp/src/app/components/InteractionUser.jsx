import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

export const InteractionUser = ({ _id, name, image }) => {
    return (
        <View style={[styles.user, { paddingVertical: 8 }]}>
            <View style={styles.user}>
                <Image
                    style={styles.userImage}
                    source={{ uri: image }}
                />
                <Text style={styles.userName}>{name}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.6}
            >
                <Icon
                    name="trash"
                    size={22}
                    color="#d00"
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userName: {
        fontSize: 17
    },
    userImage: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 50,
    },
})