import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { fetchRegistryItem } from '../lib/registry-client';

export async function init() {
  console.log(chalk.blue('Initializing a new SolancnUI project'));
  
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-solancn-app'
    },
    {
      type: 'list',
      name: 'template',
      message: 'Select a starter template:',
      choices: ['blank', 'dashboard', 'store']
    }
  ]);
  
  const spinner = ora('Creating project...').start();
  
  try {
    // Create project directory
    await fs.mkdir(answers.projectName);
    
    // Fetch template from registry
    const template = await fetchRegistryItem(answers.template);
    
    // Process template files and write to disk
    // ...
    
    spinner.succeed('Project created successfully!');
    
    console.log(chalk.green('\nNext steps:'));
    console.log(`  cd ${answers.projectName}`);
    console.log('  pnpm install');
    console.log('  pnpm dev');
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(error);
  }
}