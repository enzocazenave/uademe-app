import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { career as careers } from "../../data/career";
import { SuggestedCareer } from "./SuggestedCareer";

const removeAccents = (cadena) => {
	const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
	return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

export const CoupleQuestions = () => {

    const { user } = useAuthContext();
    
    const [age, setAge] = useState('');
    const [career, setCareer] = useState('');
    const [suggestedCareers, setSuggestedCareers] = useState([]);
    const [selectedCareer, setSelectedCareer] = useState({});

    useEffect(() => {
        if (career.length % 3 == 0 || career.length === 0) return;

        const filteredCareers = careers.filter(careersItem => {
            const { title } = careersItem;
            const query = removeAccents(career.toLowerCase().trim());
            const condition = removeAccents(title.toLowerCase()).startsWith(query);
            return condition;
        });

        setSuggestedCareers(filteredCareers);
    }, [career]);

    console.log('rerendered')
    
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
                <TextInput 
                    style={ styles.input } 
                    value={ career }
                    onChangeText={ setCareer }
                />
            </View>

            {
                (career.length >= 3 && selectedCareer.title !== career && suggestedCareers.length > 0) && (
                    <SuggestedCareer 
                        suggestedCareers={ suggestedCareers } 
                        setCareer={ setCareer } 
                        setSelectedCareer={ setSelectedCareer } 
                    />
                )
            }
            

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
        gap: 15
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
        borderRadius: 7
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
        zIndex: 0
    },
});