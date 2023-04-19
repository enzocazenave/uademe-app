import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CoupleCard, CoupleQuestions } from '../components';
import { useCouple } from '../../hooks/useCouple';

export const CoupleScreen = () => {
    const { user } = useAuthContext();
    const { handleNextUser, users, lastUser } = useCouple();

    return (
        <View style={ styles.container }>
            {(user.career < 0)
                ? <CoupleQuestions />
                : (
                    <View>
                        { lastUser.name
                            ? (
                                <CoupleCard
                                    user={ lastUser }
                                    isFirst={ false }
                                    handleNextUser={ () => {} }
                                    lastUser
                                />
                            ) 
                            : (
                                users.map((user, index) => {
                                    const isFirst = index === 0
        
                                    return (<CoupleCard
                                        key={ user._id }
                                        isFirst={ isFirst }
                                        handleNextUser={ handleNextUser }
                                        user={ user }
                                    />)
                                }).reverse()
                            )
                        }
                        {}
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
})