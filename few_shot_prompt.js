/**
 * Convert a string to camelCase.
 * Examples:
 *   'first name'   -> 'firstName'
 *   'user_id'      -> 'userId'
 *   'SCREEN_NAME'  -> 'screenName'
 *   'mobile-number'-> 'mobileNumber'
 *
 * Splits on any non-alphanumeric sequence, lowercases words, then
 * capitalizes each word except the first.
 */
function toCamelCase(input) {
    if (input == null) return '';
    const str = String(input).trim();
    if (!str) return '';

    const parts = str.split(/[^A-Za-z0-9]+/).filter(Boolean);
    if (parts.length === 0) return '';

    return parts
        .map((part, idx) => {
            const lower = part.toLowerCase();
            if (idx === 0) return lower;
            return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join('');
}

module.exports = toCamelCase;

// Quick manual tests when run directly:
if (require.main === module) {
    console.log(toCamelCase('first name'));      // firstName
    console.log(toCamelCase('user_id'));         // userId
    console.log(toCamelCase('SCREEN_NAME'));     // screenName
    console.log(toCamelCase('mobile-number'));   // mobileNumber
    console.log(toCamelCase('  multiple--separators__Here ')); // multipleSeparatorsHere
}