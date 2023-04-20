import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { ProfileImage } from '../components';
import { career } from '../../data/career';
import { useProfileScreen } from '../../hooks/useProfileScreen';

const { height: screenHeight } = Dimensions.get('screen');

export const ProfileScreen = () => {
    const { user, age, about, images, setAbout, uploadImageToCloudinary } = useProfileScreen();

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss } accessible={ false }>
            <View
                style={ styles.container }
            >
                <View style={ styles.profile }>
                    <View style={ styles.profileInfoContainer }>
                        <Text style={ styles.profileName }>{ user.name } { user.surname }{ age ?  (<Text style={ styles.age }>, { age }</Text>) : ''}</Text>
                        <Text 
                            style={ styles.profileCareer }
                            numberOfLines={ 1 }
                            ellipsizeMode='tail'
                        >
                            { career[user.career]?.value }
                        </Text>
                    </View>
                    <Text style={ styles.aboutTitle }>Sobre mí</Text>
                    <TextInput
                        multiline={ true }
                        numberOfLines={ 4 }
                        style={ styles.aboutInput }
                        onChangeText={ (text) => setAbout(text) }
                        value={ about }
                    />
                </View>

                <View style={ styles.boxes }>
                    <View style={ styles.row }>
                        <ProfileImage image={ images[0]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[1]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[2]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                    </View>
                    <View style={ styles.row }>
                        <ProfileImage image={ images[3]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[4]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[5]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                    </View>
                    <View style={ styles.row }>
                        <ProfileImage image={ images[6]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[7]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
                        <ProfileImage image={ images[8]?.url } uploadImageToCloudinary={ uploadImageToCloudinary } />
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