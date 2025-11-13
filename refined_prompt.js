/**
 * Convert a string to lower camel case (a.k.a. "camelCase").
 *
 * Behavior and features:
 * - Accepts a string and attempts to produce a normalized camelCase identifier suitable for keys, variables, or identifiers.
 * - Treats null or undefined as an empty input and returns an empty string.
 * - Throws a TypeError if the provided value is not a string (except for null/undefined which return '').
 * - Performs Unicode normalization (NFKD) and removes combining diacritical marks so base letters are preserved (e.g., "é" -> "e").
 * - Collapses common separators (spaces, hyphens, underscores, slashes, dots, and runs thereof) into single token boundaries.
 * - Removes any remaining characters that are not letters or numbers (while preserving Unicode letters and digits).
 * - Tokenizes words, further splitting tokens that use camel/Pascal/ACRONYM-with-numbers patterns so segments like:
 *     - "XMLHttpRequest" -> ["XML","Http","Request"]
 *     - "version2ID" -> ["version2","ID"]
 *     - "user_name" -> ["user","name"]
 *   are handled sensibly.
 * - Builds camelCase by lowercasing the first token entirely and capitalizing subsequent tokens (first letter uppercase, rest lowercased).
 * - Preserves numeric runs within tokens (e.g., "field2Name" -> "field2Name").
 * - Returns an empty string when the normalized input contains no valid letter/number content.
 *
 * Examples:
 * - toCamelCase("  user_name ") -> "userName"
 * - toCamelCase("XML Http Request") -> "xmlHttpRequest"
 * - toCamelCase("café-au-lait") -> "cafeAuLait"
 * - toCamelCase(null) -> ""
 *
 * @function toCamelCase
 * @param {string|null|undefined} input - The input to convert. If null or undefined, the function returns an empty string.
 * @returns {string} The camelCase representation of the input, or an empty string if the input is empty or contains no valid letters/digits after normalization.
 * @throws {TypeError} If input is provided and is not a string.
 */
 
/**
 * Convert a string to dot.case (lowercase tokens separated by dots).
 *
 * Behavior and features:
 * - Accepts a string and produces a lowercase, dot-separated representation appropriate for namespacing or keys.
 * - Treats null or undefined as an empty input and returns an empty string.
 * - Throws a TypeError if the provided value is not a string (except for null/undefined which return '').
 * - Performs Unicode normalization (NFKD) and removes combining diacritical marks so base letters are preserved (e.g., "ñ" -> "n").
 * - Converts common separators (spaces, underscores, hyphens, slashes, and dots) into token boundaries.
 * - Strips any remaining characters that are not letters or digits (preserving Unicode letters and digits).
 * - Further splits tokens using rules that detect:
 *     - Acronyms followed by capitalized words ("XMLHttp" -> ["XML","Http"]),
 *     - Normal capitalized/lowercase words,
 *     - Pure digit runs,
 *     - Remaining uppercase runs.
 *   This improves handling of mixed-case identifiers and numbers.
 * - Lowercases all resulting pieces and joins them with '.' characters.
 * - Filters out any empty pieces and returns an empty string when there is no valid content.
 *
 * Examples:
 * - toDotCase("  user_name ") -> "user.name"
 * - toDotCase("XMLHttpRequest") -> "xml.http.request"
 * - toDotCase("Release/v2.0") -> "release.v2.0"
 * - toDotCase(undefined) -> ""
 *
 * @function toDotCase
 * @param {string|null|undefined} input - The input string to convert. If null or undefined, the function returns an empty string.
 * @returns {string} The dot.case (lowercase, dot-separated) representation of the input, or an empty string if nothing remains after normalization.
 * @throws {TypeError} If input is provided and is not a string.
 */
'use strict';

function toCamelCase(input) {
    if (input === null || input === undefined) return '';
    if (typeof input !== 'string') throw new TypeError('toCamelCase expects a string');

    // Trim and handle empty
    let s = input.trim();
    if (s === '') return '';

    // Normalize Unicode and strip diacritics (preserve base letters)
    s = s.normalize('NFKD').replace(/\p{M}/gu, '');

    // Collapse listed separators to a single space, trim edges
    s = s.replace(/[\s\-_\/\.]+/g, ' ').trim();

    // Remove any remaining non-alphanumeric characters (preserve letters/numbers and spaces)
    s = s.replace(/[^\p{L}\p{N} ]+/gu, '').trim();
    if (s === '') return '';

    // Split on spaces, then further split tokens on camel/upper-case boundaries:
    // captures sequences like "XML", "Http", "user", "ID", "version2"
    const parts = [];
    for (const token of s.split(' ')) {
        if (!token) continue;
        const chunks = token.match(/[A-Z]+(?=[A-Z][a-z0-9]|$)|[A-Z]?[a-z0-9]+/gu);
        if (chunks) parts.push(...chunks);
    }

    if (parts.length === 0) return '';

    // Build camelCase: first part lowercase, subsequent parts Capitalized (rest lowercased)
    const first = parts[0].toLowerCase();
    const rest = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());

    return [first, ...rest].join('');
}

module.exports = toCamelCase;

function toDotCase(input) {
    if (input === null || input === undefined) return '';
    if (typeof input !== 'string') throw new TypeError('toDotCase expects a string');

    let s = input.trim();
    if (s === '') return '';

    // Normalize and strip diacritics
    s = s.normalize('NFKD').replace(/\p{M}+/gu, '');

    // Convert common separators to spaces for tokenization
    s = s.replace(/[\s_\-\/\.]+/g, ' ').trim();

    // Remove any remaining undesirable characters (keep letters, numbers, spaces)
    s = s.replace(/[^\p{L}\p{N} ]+/gu, '').trim();
    if (s === '') return '';

    // Split into tokens and further split camel/Pascal/ID-style tokens.
    // This regex captures:
    // - sequences of uppercase letters followed by an uppercase+lowercase (acronyms before a proper word),
    // - normal capitalized or lowercase words,
    // - digit runs,
    // - remaining uppercase runs.
    const tokens = [];
    for (const part of s.split(' ')) {
        if (!part) continue;
        const pieces = part.match(/([A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|\d+|[A-Z]+)/gu);
        if (pieces) tokens.push(...pieces);
    }

    if (tokens.length === 0) return '';

    // Lowercase all pieces and join with dots, removing any empty pieces
    return tokens
        .map(p => p.toLowerCase())
        .filter(Boolean)
        .join('.');
}

module.exports.toDotCase = toDotCase;


