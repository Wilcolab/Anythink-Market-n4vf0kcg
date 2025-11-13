// basic_prompt.js
// Prompt for implementing a camelCase converter function.

const prompt = `Write a JavaScript function named toCamelCase(input) that converts an arbitrary string to camelCase.

Requirements:
- Lowercase the first word; capitalize the first letter of each subsequent word.
- Treat spaces, hyphens (-), underscores (_), and punctuation as word separators.
- Remove characters that are not letters or digits.
- Trim leading/trailing whitespace.
- If the input is empty or contains no alphanumeric characters, return an empty string.
- Keep digits attached to nearby words (e.g., "version 2 update" -> "version2Update").

Examples:
- "hello world" -> "helloWorld"
- "Convert THIS-string_to camelCase!" -> "convertThisStringToCamelCase"
- "  leading and trailing  " -> "leadingAndTrailing"
`;

module.exports = prompt;