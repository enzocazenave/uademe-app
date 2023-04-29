import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import { ProfileImage } from '../components';
import { career } from '../../data/career';
import { useProfileScreen } from '../../hooks/useProfileScreen';

const { height: screenHeight } = Dimensions.get('screen');

export const ProfileScreen = () => {
    const { user, age, about, images, setAbout, haveToSave, changeAbout } = useProfileScreen();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View
                style={styles.container}
            >
                <View style={styles.profile}>
                    <View style={styles.profileInfoContainer}>
                        <View style={styles.firstLine}>
                            <Text style={styles.profileName}>{user.name} {user.surname}{age ? (<Text style={styles.age}>, {age}</Text>) : ''}</Text>
                            <TouchableOpacity
                                style={haveToSave ? styles.saveButtonActive : styles.saveButton}
                                disabled={!haveToSave}
                                onPress={changeAbout}
                                activeOpacity={0.7}
                            >
                                <Text style={haveToSave ? styles.saveButtonTextActive : styles.saveButtonText}>
                                    Guardar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={styles.profileCareer}
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {career[user.career]?.value}
                        </Text>
                    </View>
                    <Text style={styles.aboutTitle}>Sobre mí</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        style={styles.aboutInput}
                        onChangeText={(text) => setAbout(text)}
                        value={about}
                    />
                </View>

                <View style={styles.boxes}>
                    <View style={styles.row}>
                        <ProfileImage imageToShow={images[0]} />
                        <ProfileImage imageToShow={images[1]} />
                        <ProfileImage imageToShow={images[2]} />
                    </View>
                    <View style={styles.row}>
                        <ProfileImage imageToShow={images[3]} />
                        <ProfileImage imageToShow={images[4]} />
                        <ProfileImage imageToShow={images[5]} />
                    </View>
                    <View style={styles.row}>
                        <ProfileImage imageToShow={images[6]} />
                        <ProfileImage imageToShow={images[7]} />
                        <ProfileImage imageToShow={images[8]} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
    },
    profile: {
        paddingHorizontal: 15,
        gap: 10,
    },
    firstLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    saveButton: {
        borderColor: '#00f7',
        borderWidth: 1,
        borderRadius: 5,
        padding: 3
    },
    saveButtonActive: {
        borderColor: '#00f',
        borderWidth: 1,
        borderRadius: 5,
        padding: 3
    },
    saveButtonText: {
        color: '#00f7'
    },
    saveButtonTextActive: {
        color: '#00f'
    },
    profileInfoContainer: {
        gap: 2
    },
    profileName: {
        fontSize: 25,
    },
    profileCareer: {
        fontSize: 15,
        color: '#444',
        fontWeight: 300,
    },
    age: {
        fontWeight: 300
    },
    aboutTitle: {
        fontSize: 17,
        fontWeight: 500
    },
    aboutInput: {
        backgroundColor: '#fff',
        height: 70,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    boxes: {
        flexDirection: "column",
        gap: 25,
        height: screenHeight * 0.61,
        padding: 15
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        gap: 25
    },
});