export default function checkAvailability(
    hemisphere,
    customMonth,
    customTime,
    allYear,
    disableTime,
    allDay,
    critter
) {

    let critterMonthAvailability = critter[1]['availability'][`month-array-${hemisphere}`];
    let critterTimeAvailability = critter[1]['availability']['time-array'];

    if (disableTime) {
        //All critters available in the year regardless of time of day
        if (allYear) {
            if (critter[1]['availability']['isAllYear']) {
                return '';
            } else return 'unavailable';
        }
        //All critters available in the month regardless of time of day
        else if (critterMonthAvailability.includes(Number(customMonth))) {
            return '';
        } else return 'unavailable';
    }

    if (allDay) {
        if (allYear) {
            //All critters available all year and all day
            if (critter[1]['availability']['isAllYear'] && critter[1]['availability']['isAllDay']) {
                return ''
            } else return 'unavailable';
        }
        //All critters available all month and all day 
        else if (critterMonthAvailability.includes(Number(customMonth)) && critter[1]['availability']['isAllDay']) {
            return '';
        } else return 'unavailable';
    }

    if (allYear && !disableTime) {
        //All critters available all year and at specified time
        if (critter[1]['availability']['isAllYear'] && critterTimeAvailability.includes(Number(customTime))) {
            return ''
        } else return 'unavailable';
    }
    if (!allYear, !allDay, !disableTime) {
        //All critters available at specified month and specified time
        if (!critterMonthAvailability.includes(Number(customMonth))) {
            return 'unavailable';
        }
        if (!critterTimeAvailability.includes(Number(customTime))) {
            return 'unavailable';
        } else return "";
    }
}