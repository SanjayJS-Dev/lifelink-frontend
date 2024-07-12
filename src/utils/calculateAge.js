export function calculateAge(dobString) {
    const [day, month, year] = dobString.split('-').map(Number);
    const dob = new Date(year, month - 1, day);
    const today = new Date();
    
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();
    
    // Adjust age if today's date is before the birthday in the current year
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    
    return age;
}