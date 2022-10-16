export default function checkAvailability(
    hemisphere,
    customMonth,
    customTime,
    creatureEntry
) {

    let creatureMonthAvailability = creatureEntry[1]['availability'][`month-array-${hemisphere}`];
    let creatureTimeAvailability = creatureEntry[1]['availability']['time-array'];    
        if (!creatureMonthAvailability.includes(Number(customMonth))) {
            return 'unavailable';
        }
        if (!creatureTimeAvailability.includes(Number(customTime))) {
            return 'unavailable';
        } else return "";
    
}