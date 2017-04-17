// Regex:
// All chars from 'a' to 'z' 
// Also include '?' and '!'
// Only match single char
// Ignore case
export const validCharacters = new RegExp('([A-Z!?])', 'i')
