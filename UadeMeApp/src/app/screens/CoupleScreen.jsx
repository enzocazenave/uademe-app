import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CoupleCard, CoupleQuestions } from '../components';
import { useCoupleScreen } from '../../hooks/useCoupleScreen';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export const CoupleScreen = () => {
    const { user } = useAuthContext();
    const { handleNextUser, users, lastUser, match, noMatch, getUsers } = useCoupleScreen();
    const { params } = useRoute();

    useEffect(() => {
        if (params?.refresh) {
            setTimeout(() => {
                getUsers({ changeInConfig: true })
            }, 1000);
        }
    }, [params]);

    return (
        <View style={styles.container}>
            {(user.career < 0)
                ? <CoupleQuestions />
                : (
                    <View style={(users.length == 0 && !lastUser.name) && { height: '90%', justifyContent: 'center' }}>
                        {lastUser.name
                            ? (
                                <CoupleCard
                                    user={lastUser}
                                    isFirst={false}
                                    handleNextUser={() => { }}
                                    lastUser
                                />
                            )
                            : (
                                users.map((user, index) => {
                                    const isFirst = index === 0

                                    return (<CoupleCard
                                        key={user._id}
                                        isFirst={isFirst}
                                        handleNextUser={handleNextUser}
                                        user={user}
                                        match={match}
                                        noMatch={noMatch}
                                    />)
                                }).reverse()
                            )
                        }
                        {(users.length == 0 && !lastUser.name) && (
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>NO HAY MAS USUARIOS</Text>
                                <Text style={styles.paragraph}>
                                    No hay mas usuarios registrados para mostrarte. Te recomendamos volver a revisar tus
                                    <Text style={{ fontWeight: 800 }}> No Matcheados</Text> para ver si cámbias de opinión.
                                </Text>
                            </View>
                        )}
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    textContainer: {
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '90%',
    },
    textContainer: {
        gap: 10,
        padding: 5
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 700
    },
    paragraph: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 500
    }
})