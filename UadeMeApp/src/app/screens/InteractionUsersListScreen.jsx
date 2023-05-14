import { useRoute } from "@react-navigation/native"
import { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { InteractionUser } from "../components";
import { useInteractionUsersList } from "../../hooks/useInteractionUsersList";

export const InteractionUsersListScreen = () => {

    const { params: { match } } = useRoute();
    const { users, isLoading } = useInteractionUsersList({ match });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {match ? 'Usuarios que te gustaron' : 'Usuarios que no te gustaron'}
            </Text>

            {(isLoading) && (
                <ActivityIndicator
                    style={{ marginTop: 40 }}
                    size="large"
                    color="#1778AF"
                />
            )}

            <ScrollView
                style={styles.list}
                showsVerticalScrollIndicator={false}
            >
                {users.map((user) => (
                    <InteractionUser key={user._id} _id={user._id} name={user.name} image={user.profileImages[0].url} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    title: {
        fontWeight: 600,
        fontSize: 25
    },
    list: {
        height: '100%',
        marginTop: 20
    },
})