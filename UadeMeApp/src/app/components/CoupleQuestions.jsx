import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useMemo, useState } from "react";
import { career as careers } from "../../data/career";
import { SuggestedCareer } from "./SuggestedCareer";
import SelectList from "./SelectList";

export const CoupleQuestions = () => {

    const { user } = useAuthContext();
    
    const [age, setAge] = useState('');
    const [selectedCareer, setSelectedCareer] = useState({});

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.welcomeText }>Bienvenido a UadeMe</Text>
                <Text style={ styles.welcomeTextSmaller }>{ user.name } { user.surname }</Text>
            </View>
            
            <Text style={ styles.title }>Necesitamos que completes algunos datos.</Text>
            
            <View style={ styles.inputContainer }>
                <Text style={ styles.inputTitle }>Edad</Text>
                <TextInput 
                    style={ styles.input } 
                    keyboardType="number-pad" 
                    value={ age }
                    onChangeText={ setAge }
                />
            </View>

            <View style={ styles.inputContainer }>
                <Text style={ styles.inputTitle }>Carrera</Text>
                {/*<TextInput 
                    style={ styles.input } 
                    value={ career }
                    onChangeText={ setCareer }
                />
                {(career.length >= 3 && selectedCareer.title !== career && suggestedCareers.length > 0) && (
                    <SuggestedCareer 
                        suggestedCareers={ suggestedCareers } 
                        setCareer={ setCareer } 
                        setSelectedCareer={ setSelectedCareer } 
                    />
                )}*/}

                <SelectList
                    data={ careers }
                    inputStyles={ styles.dropdownInput }
                    dropdownStyles={ styles.dropdown }
                    boxStyles={ styles.dropdownBox }
                    dropdownItemStyles={ styles.dropdownItem }
                    searchPlaceholder="Buscá tu carrera"
                    setSelected={ (id) => {
                        const value = careers[id]?.value;
                        if (!value) return;
                        setSelectedCareer(careers[id]);
                    }}
                    notFoundText="No se encontraron resultados"
                    maxHeight={ 200 }
                />
            </View>

            <Text style={ styles.textProfile }>Puedes cambiar tus fotos de perfil ingresando a la sección "Perfil", a la cual se puede acceder mediante la última opción del menú inferior.</Text>

            <TouchableOpacity
                activeOpacity={ 0.7 }
                style={ styles.button }
            >
                <Text style={ styles.buttonText }>Guardar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 20,
        backgroundColor: '#1778AF',
        gap: 15,
        zIndex: 1
    },
    welcomeText: {
        fontSize: 20,
        color: '#f0f0f0',
        fontWeight: 600
    },
    welcomeTextSmaller: {
        fontSize: 17,
        color: '#f0f0f0',
        fontWeight: 400
    },
    title: {
        fontSize: 17,
        fontWeight: 600,
        color: '#f0f0f0'
    },
    button: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 7,
        zIndex: -1
    },
    buttonText: {
        textAlign: 'center',
        color: '#1778AF',
        fontWeight: 600,
        fontSize: 16
    },
    inputContainer: {
        flexDirection: 'column',
        gap: 5
    },  
    inputTitle: {
        color: '#f0f0f0',
        fontSize: 16,
        fontWeight: 500
    },
    input: {
        backgroundColor: '#3789B7',
        padding: 10,
        borderRadius: 7,
        color: '#f0f0f0'
    },
    textProfile: {
        color: '#f0f0f0',
        fontWeight: 400,
        zIndex: -1
    },
    dropdownInput: { borderWidth: 0, backgroundColor: '#3789B7', padding: 0, color: '#f0f0f0' },
    dropdownBox: { borderWidth: 0, backgroundColor: '#3789B7' },
    dropdown: { backgroundColor: '#e5e5e5', padding: 0 },
    dropdownItem: { borderBottomColor: '#ddd', borderBottomWidth: 1  }
});