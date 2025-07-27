// cli-test.js
const { program } = require('./dist/index.js');

// This will simulate running your CLI with various commands
console.log('Testing CLI commands:');

// You can simulate different commands here
// For example:
console.log('\n=== Running init command ===');
// Simulate arguments
process.argv = ['node', 'cli-test.js', 'init'];
// You would need to modify your program to export the program object without immediately calling parse()

console.log('\n=== Running components list command ===');
process.argv = ['node', 'cli-test.js', 'components', 'list'];
// etc.