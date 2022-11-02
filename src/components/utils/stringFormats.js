function formatCritterFileName(string) {
    const newString = string.replace(/_/g, ' ');
    const formattedString = newString.charAt(0).toUpperCase() + newString.slice(1);
    return formattedString;
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { formatCritterFileName, capitaliseFirstLetter }

