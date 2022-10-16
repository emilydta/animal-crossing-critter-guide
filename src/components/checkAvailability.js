export default function checkAvailability(
    hemisphere,
    customMonth,
    customTime,
    critter
) {

    let critterMonthAvailability = critter[1]['availability'][`month-array-${hemisphere}`];
    let critterTimeAvailability = critter[1]['availability']['time-array'];    
        if (!critterMonthAvailability.includes(Number(customMonth))) {
            return 'unavailable';
        }
        if (!critterTimeAvailability.includes(Number(customTime))) {
            return 'unavailable';
        } else return "";
    
}