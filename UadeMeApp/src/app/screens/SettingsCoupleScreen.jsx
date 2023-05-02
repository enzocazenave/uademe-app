import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import backend from "../../api/backend";
import { useAuthContext } from "../../hooks/useAuthContext";

export const SettingsCoupleScreen = () => {

    const [genderYouSearch, setGenderYouSearch] = useState(-1);
    const [gender, setGender] = useState(-1);
    const { user } = useAuthContext();
    const stateRef = useRef();
    stateRef.current = { gender, genderYouSearch };
    const initialStateRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await backend.get(`/user/${user?._id}`);
            if (data.user.gender == -1) return;
            if (data.user.genderYouSearch == -1) return;
            handleChangeGender(data.user.gender);
            handleChangeGenderYouSearch(data.user.genderYouSearch);
            initialStateRef.current = { gender: data.user.gender, genderYouSearch: data.user.genderYouSearch };
        }

        fetchData();

        return async () => {
            const { gender, genderYouSearch } = stateRef.current;
            const { gender: initialGender, genderYouSearch: initialGenderYouSearch } = initialStateRef.current;

            if (gender != initialGender || genderYouSearch != initialGenderYouSearch)
                await backend.patch(`/couple/settings/${user?._id}`, {
                    gender: stateRef.current.gender,
                    genderYouSearch: stateRef.current.genderYouSearch
                });
        }
    }, []);

    const handleChangeGenderYouSearch = (gender) => {
        setGenderYouSearch(gender);
        console.log('Ahora genderYouSearch vale: ', gender)
    }

    const handleChangeGender = (gender) => {
        setGender(gender);
        console.log('Ahora gender vale: ', gender)
    }

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Busco conocer</Text>
                <View style={styles.sectionButtons}>
                    <TouchableOpacity
                        style={[styles.sectionButton, genderYouSearch == 0 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGenderYouSearch(0) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, genderYouSearch == 0 && styles.sectionButtonTextSelected]}>Hombres</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sectionButton, genderYouSearch == 1 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGenderYouSearch(1) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, genderYouSearch == 1 && styles.sectionButtonTextSelected]}>Mujeres</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sectionButton, genderYouSearch == 2 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGenderYouSearch(2) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, genderYouSearch == 2 && styles.sectionButtonTextSelected]}>Ambos</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Mi género es</Text>
                <View style={styles.sectionButtons}>
                    <TouchableOpacity
                        style={[styles.sectionButton, gender == 0 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGender(0) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, gender == 0 && styles.sectionButtonTextSelected]}>Masculino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sectionButton, gender == 1 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGender(1) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, gender == 1 && styles.sectionButtonTextSelected]}>Femenino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.sectionButton, gender == 2 && styles.sectionButtonSelected]}
                        onPress={() => { handleChangeGender(2) }}
                        activeOpacity={0.6}
                    >
                        <Text style={[styles.sectionButtonText, gender == 2 && styles.sectionButtonTextSelected]}>Otros</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        gap: 30
    },
    section: {
        gap: 10
    },
    sectionTitle: {
        fontWeight: 600,
        fontSize: 25
    },
    sectionButtons: {
        flexDirection: 'row',
        gap: 10
    },
    sectionButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#1778AF'
    },
    sectionButtonText: {
        textAlign: 'center',
        color: '#1778AF',
        fontWeight: 700
    },
    sectionButtonSelected: {
        backgroundColor: '#1778AF'
    },
    sectionButtonTextSelected: {
        color: '#f0f0f0'
    }
})