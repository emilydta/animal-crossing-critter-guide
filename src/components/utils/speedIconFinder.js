import speedIcons from '../../images/modalIcons/speedIcons/speedIcons.js'

const speedIconFinder = (critter) => {
    if (critter['speed'] === 'Stationary') {
        return speedIcons.stationary;
    }
    if (critter['speed'] === 'Very slow') {
        return speedIcons.verySlow;
    }
    if (critter['speed'] === 'Slow') {
        return speedIcons.slow;
    }
    if (critter['speed'] === 'Medium') {
        return speedIcons.medium;
    }
    if (critter['speed'] === 'Fast') {
        return speedIcons.fast;
    }
    if (critter['speed'] === 'Very fast') {
        return speedIcons.veryFast;
    }
}

export default speedIconFinder;