/**
 * Convert a string to snake_case.
 *
 * Rules:
 * - Normalize unicode (remove accents) when available.
 * - Convert camelCase / PascalCase boundaries to underscores.
 * - Replace any non-alphanumeric sequence with a single underscore.
 * - Collapse multiple underscores, trim leading/trailing underscores.
 * - Lowercase the final result.
 *
 * Examples:
 *  snakeCase('Hello World') => 'hello_world'
 *  snakeCase('fooBarBaz') => 'foo_bar_baz'
 *  snakeCase('  --Foo--Bar-- ') => 'foo_bar'
 */
function snakeCase(input) {
  if (input == null) return '';
  const str = String(input);
  const normalized = typeof str.normalize === 'function'
    ? str.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    : str;

  // Put an underscore between lower-to-upper transitions (camelCase -> snake_case)
  let out = normalized.replace(/([a-z0-9])([A-Z])/g, '$1_$2');

  // Replace any non-alphanumeric character (including spaces, punctuation) with underscore
  out = out.replace(/[^A-Za-z0-9]+/g, '_');

  // Lowercase, collapse duplicate underscores, trim underscores
  out = out.toLowerCase().replace(/^_+|_+$/g, '').replace(/_+/g, '_');

  return out;
}

// CommonJS default export
module.exports = snakeCase;
// Named export for CommonJS consumers
module.exports.snakeCase = snakeCase;
// ES module default compatibility (some bundlers will pick up .default)
module.exports.default = snakeCase;
