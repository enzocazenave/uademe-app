import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native"

export const SuggestedCareer = ({ suggestedCareers, setCareer, setSelectedCareer }) => {
    return (
        <ScrollView 
            style={ styles.suggestMenu }
        >
            { suggestedCareers.map(suggestedCareer => (
                <TouchableOpacity
                    style={ styles.suggestItem }
                    activeOpacity={ 0.8 }
                    onPress={ () => {
                        setCareer(suggestedCareer.title);
                        setSelectedCareer(suggestedCareer);
                    }}
                    key={ suggestedCareer.id }
                >
                    <Text>{ suggestedCareer.title }</Text>
                </TouchableOpacity>
            )) }                     
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    suggestMenu: {
        position: 'absolute',
        left: 0,
        bottom: -240,
        height: 240,
        maxHeight: 240,
        backgroundColor: '#e5e5e5',
        borderRadius: 7,
        zIndex: 1,
        borderColor: '#ddd',
        borderWidth: 1,
        zIndex: 1,
        flexBasis: 1
    },
    suggestItem: {
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})