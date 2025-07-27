// cli-test.js
import program from './dist/index.js';

// This will simulate running your CLI with various commands
console.log('Testing CLI commands:');

// You can simulate different commands here
// For example:
// console.log('\n=== Running help command ===');
// // Simulate arguments
// process.argv = ['node', 'cli-test.ts', 'help'];
// You would need to modify your program to export the program object without immediately calling parse()
program().parse(process.argv);

console.log('\n=== Running components command ===');
process.argv = ['node', 'cli-test.ts', 'components', 'list'];
program().parse(process.argv);
// etc.