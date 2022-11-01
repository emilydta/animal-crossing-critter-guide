import shadowIcons from '../../images/modalIcons/shadowIcons/shadowIcons.js'

const shadowIconFinder = (fish) => {
    if (fish['shadow'] === 'Smallest (1)') {
        return shadowIcons.smallest1;
    }
    if (fish['shadow'] === 'Small (2)') {
        return shadowIcons.small2;
    }
    if (fish['shadow'] === 'Medium (3)') {
        return shadowIcons.medium3;
    }
    if (fish['shadow'] === 'Medium (4)') {
        return shadowIcons.medium4;
    }
    if (fish['shadow'] === 'Large (5)') {
        return shadowIcons.large5;
    }
    if (fish['shadow'] === 'Largest (6)') {
        return shadowIcons.largest6;
    }
    if (fish['shadow'] === 'Largest with fin (6)') {
        return shadowIcons.largestWithFin;
    }
    if (fish['shadow'] === 'Narrow') {
        return shadowIcons.narrow;
    }
}

export default shadowIconFinder;