export function validateAndConvertDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        throw new Error("Wybrana data nie może być z przeszłości!");
    }

    return selectedDate;
}