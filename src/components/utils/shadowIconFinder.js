import shadowIcons from '../../icons/modalIcons/shadowIcons/shadowIcons.js'

const shadowIconFinder = (critter) => {
    //Sea
    if (critter['shadow'] === 'Smallest') {
        return shadowIcons.smallest;
    }
    if (critter['shadow'] === 'Small') {
        return shadowIcons.small;
    }
    if (critter['shadow'] === 'Medium') {
        return shadowIcons.medium;
    }
    if (critter['shadow'] === 'Large') {
        return shadowIcons.large;
    }
    if (critter['shadow'] === 'Largest') {
        return shadowIcons.largest;
    }
    
    //Fish
    if (critter['shadow'] === 'Smallest (1)') {
        return shadowIcons.smallest1;
    }
    if (critter['shadow'] === 'Small (2)') {
        return shadowIcons.small2;
    }
    if (critter['shadow'] === 'Medium (3)') {
        return shadowIcons.medium3;
    }
    if (critter['shadow'] === 'Medium (4)') {
        return shadowIcons.medium4;
    }
    if (critter['shadow'] === 'Large (5)') {
        return shadowIcons.large5;
    }
    if (critter['shadow'] === 'Largest (6)') {
        return shadowIcons.largest6;
    }
    if (critter['shadow'] === 'Medium with fin (4)' || critter['shadow'] === 'Largest with fin (6)') {
        return shadowIcons.largestWithFin;
    }
    if (critter['shadow'] === 'Narrow') {
        return shadowIcons.narrow;
    }
}

export default shadowIconFinder;