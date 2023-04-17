export const getAgeFromDate = (date) => {
    const today = new Date();
    const birthdate = new Date(Date.parse(date));

    const age = today.getFullYear() - birthdate.getFullYear() - 
        (today.getMonth() < birthdate.getMonth() || 
        (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    
    return age;
}