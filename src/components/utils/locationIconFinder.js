import locationIcons from '../../images/modalIcons/locationIcons/locationIcons.js'

const locationIconFinder = (critter) => {
    //BUGS
    if (critter['availability']['location'] === 'Flying'
        || critter['availability']['location'] === 'Flying (near water)') {
        return locationIcons.flying;
    }
    if (critter['availability']['location'] === 'Flying by light') {
        return locationIcons.flyingByLight;
    }
    if (critter['availability']['location'] === 'Flying near hybrid flowers') {
        return locationIcons.flyingNearHybridFlowers;
    }
    if (critter['availability']['location'] === 'On trees'
        || critter['availability']['location'] === 'Under trees') {
        return locationIcons.onTrees;
    }
    if (critter['availability']['location'] === 'On the ground') {
        return locationIcons.onTheGround;
    }
    if (critter['availability']['location'] === 'On flowers') {
        return locationIcons.onFlowers;
    }
    if (critter['availability']['location'] === 'On white flowers') {
        return locationIcons.onWhiteFlowers;
    }
    if (critter['availability']['location'] === 'Shaking trees') {
        return locationIcons.shakingTrees;
    }
    if (critter['availability']['location'] === 'Underground') {
        return locationIcons.underground;
    }
    if (critter['availability']['location'] === 'On tree stumps') {
        return locationIcons.onTreeStumps;
    }
    if (critter['availability']['location'] === 'On palm trees') {
        return locationIcons.onPalmTrees;
    }
    if (critter['availability']['location'] === 'On rotten food') {
        return locationIcons.onRottenFood;
    }
    if (critter['availability']['location'] === 'On the beach') {
        return locationIcons.onTheBeach;
    }
    if (critter['availability']['location'] === 'On beach rocks') {
        return locationIcons.onBeachRocks;
    }
    if (critter['availability']['location'] === 'Near trash') {
        return locationIcons.nearTrash;
    }
    if (critter['availability']['location'] === 'On villagers') {
        return locationIcons.onVillagers;
    }
    if (critter['availability']['location'] === 'On rocks and bush (when raining)') {
        return locationIcons.onRocksAndBush;
    }
    if (critter['availability']['location'] === 'Hitting rocks') {
        return locationIcons.hittingRocks;
    }

    //FISH
    if (critter['availability']['location'] === 'Pond') {
        return locationIcons.pond;
    }
    if (critter['availability']['location'] === 'River'
        || critter['availability']['location'] === 'River (Clifftop)'
        || critter['availability']['location'] === 'River (Mouth)') {
        return locationIcons.river;
    }
    if (critter['availability']['location'] === 'Sea'
        || critter['availability']['location'] === 'Sea (when raining or snowing)') {
        return locationIcons.sea;
    }
    if (critter['availability']['location'] === 'Pier') {
        return locationIcons.pier;
    }
    if (critter['availability']['location'] === 'River (Clifftop) & Pond'
        || critter['availability']['location'] === 'On ponds and rivers') {
        return locationIcons.pondAndRiver;
    }
    if (critter['availability']['location'] === 'Pond') {
        return locationIcons.pond;
    }
}

export default locationIconFinder;