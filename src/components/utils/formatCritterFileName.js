const formatCritterFileName = (string) => {
    const newString = string.replace(/_/g, ' ');
    const formattedString = newString.charAt(0).toUpperCase() + newString.slice(1);
    return formattedString;
}

export default formatCritterFileName;