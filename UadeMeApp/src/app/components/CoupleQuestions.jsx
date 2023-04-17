import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useAuthContext } from "../../hooks/useAuthContext";
import { useMemo, useState } from "react";
import { career as careers } from "../../data/career";
import SelectList from "./SelectList";
import DatePicker from "react-native-date-picker";
import backend from "../../api/backend";
import AsyncStorage from "@react-native-async-storage/async-storage";

const genders = [
    { key: 0, value: 'Masculino' },
    { key: 1, value: 'Femenino' },
    { key: 2, value: 'Otros' }
]

export const CoupleQuestions = () => {

    const { user, setUser } = useAuthContext();
    
    const [selectedCareer, setSelectedCareer] = useState({});
    const [selectedGender, setSelectedGender] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [modalDatePicker, setModalDatePicker] = useState(false);
    const [birthdate, setBirthdate] = useState(new Date());
    const [birthdateWasChange, setBirthdateWasChange] = useState(false);
        
    const processBirthdate = useMemo(() => {
        const day = birthdate.getDate();
        const month = birthdate.getMonth();
        const year = birthdate.getFullYear();

        return birthdateWasChange
            ? `${day}/${month}/${year}`
            : 'Selecciona una fecha'
    }, [birthdateWasChange]);

    const submitQuestions = async() => {
        const { data } = await backend.post(`/user/answer/${ user._id }`, {
            birthdate,
            career: selectedCareer.key,
            gender: selectedGender.key
        });

        await AsyncStorage.setItem('@uademe:token', data.session.token);
        delete data.session.token;

        setUser(data.session);
    }

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.welcomeText }>Bienvenido a UadeMe</Text>
                <Text style={ styles.welcomeTextSmaller }>{ user.name } { user.surname }</Text>
            </View>
            
            <Text style={ styles.title }>Necesitamos que completes algunos datos.</Text>
            
            <View style={ styles.inputGroup }>
                {(!dropdown) && (
                    <View style={ [styles.inputContainer, { flex: 3 }] }>
                        <Text style={ styles.inputTitle }>Fecha de nacimiento</Text>
                        <TextInput 
                            style={ styles.input } 
                            value={ processBirthdate }
                            placeholder="DD/MM/YYYY"
                            onFocus={ () => setModalDatePicker(true) }
                        />
                    </View>
                )}
                
                <View style={ [styles.inputContainer, { flex: 2 }] }>
                    <Text style={ styles.inputTitle }>Géneros</Text>
                    <SelectList
                        data={ genders }
                        inputStyles={ styles.dropdownInput }
                        dropdownStyles={ styles.dropdown }
                        boxStyles={ styles.dropdownBox }
                        dropdownItemStyles={ styles.dropdownItem }
                        searchPlaceholder="Buscá tu carrera"
                        placeholder="Genero"
                        setSelected={ (id) => {
                            const value = genders[id]?.value;
                            if (!value) return;
                            setSelectedGender(genders[id]);
                        }}
                        search={ false }
                        onDropdownOpen={ () => {
                            setDropdown(!dropdown);
                        }}
                    />
                </View>
            </View>
                

            <View style={ styles.inputContainer }>
                <Text style={ styles.inputTitle }>Carrera</Text>

                <SelectList
                    data={ careers }
                    inputStyles={ styles.dropdownInput }
                    dropdownStyles={ styles.dropdown }
                    boxStyles={ styles.dropdownBox }
                    dropdownItemStyles={ styles.dropdownItem }
                    searchPlaceholder="Buscá tu carrera"
                    placeholder="Seleccioná tu carrera"
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

            <DatePicker
                modal
                open={ modalDatePicker }
                date={birthdate}
                onConfirm={(date) => {
                  setModalDatePicker(false)
                  setBirthdate(date);
                  setBirthdateWasChange(true);
                }}
                onCancel={() => {
                    setModalDatePicker(false)
                }}
                mode="date"
                maximumDate={ new Date() }
                confirmText="Confirmar"
                cancelText="Cancelar"
                title="Selecciona tu fecha de nacimiento"
                locale="es"
            />
            
            <TouchableOpacity
                activeOpacity={ 0.7 }
                style={ styles.button }
                onPress={ submitQuestions }
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
        gap: 5,
    },  
    inputGroup: {
        flexDirection: 'row',
        gap: 15,
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
        color: '#f0f0f0',
        paddingHorizontal: 20,
        paddingVertical: 13,
        borderRadius: 10,
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