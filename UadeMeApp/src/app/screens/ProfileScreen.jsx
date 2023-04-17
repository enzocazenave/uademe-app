import { useEffect, useMemo, useState } from 'react';
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
import { useAuthContext } from '../../hooks/useAuthContext';
import { career } from '../../data/career';
import { getAgeFromDate } from '../../helpers/getAgeFromDate';

const { height: screenHeight } = Dimensions.get('screen');

export const ProfileScreen = () => {
    const [images, setImages] = useState([]);
    const { user } = useAuthContext();
    const [about, setAbout] = useState('Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti omnis amet iusto voluptatibus. Numquam?');
    
    const age = useMemo(() => {
        const date = user.birthdate;
        if (date) return getAgeFromDate(user.birthdate);
        return 0;
    }, [user]);

    useEffect(() => {
        setImages((prev) => {
            return [
                'https://cdn.discordapp.com/attachments/1008885821027405958/1091610974768865401/Captura_de_pantalla_2023-04-01_a_las_03.32.06.png',
                'https://cdn.discordapp.com/attachments/1008885821027405958/1091820734654992404/Captura_de_pantalla_2023-04-01_a_las_17.25.37.png',
                'https://cdn.discordapp.com/attachments/1008885821027405958/1091820903878381578/Captura_de_pantalla_2023-04-01_a_las_17.26.09.png'
            ]
        });
    }, []);

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
                        <ProfileImage image={ images[0] } />
                        <ProfileImage image={ images[1] } />
                        <ProfileImage image={ images[2] } />
                    </View>
                    <View style={ styles.row }>
                        <ProfileImage image={ images[3] } />
                        <ProfileImage image={ images[4] } />
                        <ProfileImage image={ images[5] } />
                    </View>
                    <View style={ styles.row }>
                        <ProfileImage image={ images[6] } />
                        <ProfileImage image={ images[7] } />
                        <ProfileImage image={ images[8] } />
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