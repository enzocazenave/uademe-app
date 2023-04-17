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
    const { handleNextImage, handleNextUser, currentUser, missingUsers } = useCouple();

    return (
        <View style={ styles.container }>
            {(user.career < 0)
                ? <CoupleQuestions />
                : (missingUsers == 0)
                    ? <Text>No hay mas usuarios registrados</Text>
                    : (
                        <CoupleCard 
                            handleNextImage={ handleNextImage }
                            handleNextUser={ handleNextUser }
                            currentUser={ currentUser } 
                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
})