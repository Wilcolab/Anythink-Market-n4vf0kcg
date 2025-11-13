/**
 * Convert a string to kebab-case.
 * Throws if input is not a string.
 *
 * @param {string} input
 * @returns {string}
 */
function toKebabCase(input) {
    if (typeof input !== 'string') {
        throw new TypeError('Input must be a string');
    }

    // 1. Normalize the input
    let s = input.trim();
    // Normalize Unicode (decompose) and remove diacritic marks
    s = s.normalize('NFKD').replace(/\p{M}/gu, '');
    // Convert any non-alphanumeric separator (spaces, underscores, hyphens, periods, etc.) into a single space
    s = s.replace(/[^A-Za-z0-9]+/g, ' ').trim();

    if (s === '') return '';

    // 2. Transform into words
    // Split into coarse segments by spaces, then further split each segment by case/number transitions.
    const segments = s.split(' ').filter(Boolean);
    const words = [];
    const subWordRe = /([A-Z]+(?=[A-Z][a-z]))|([A-Z]?[a-z]+)|([A-Z]+)|(\d+)/g;

    for (const seg of segments) {
        let m;
        while ((m = subWordRe.exec(seg)) !== null) {
            words.push(m[0]);
        }
    }

    // 3. Convert to kebab-case
    return words.map(w => w.toLowerCase()).join('-');
}

module.exports = { toKebabCase };