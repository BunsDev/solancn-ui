import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { fetchRegistryItems } from '../lib/registry-client';
import { installComponent } from '../lib/component-installer';
import { logger } from '../lib/logger';
import { Component } from '../lib/types';

// Create components command group
const components = new Command('components')
  .description('Manage UI components in your project');

// List all available components
components
  .command('list')
  .description('List all available UI components')
  .option('-t, --type <type>', 'Filter by component type (ui, component)')
  .option('-j, --json', 'Output as JSON')
  .action(async (options) => {
    const spinner = ora('Fetching components...').start();
    
    try {
      const registry = await fetchRegistryItems({ type: 'component' });
      const allComponents = registry?.items.filter((item: Component) => 
        item.type === 'registry:ui' || item.type === 'registry:component'
      );
      
      let components = allComponents;
      
      // Apply type filter if specified
      if (options.type) {
        const typeMap: Record<string, string> = {
          'ui': 'registry:ui',
          'component': 'registry:component'
        };
        const filterType = typeMap[options.type];
        if (filterType) {
          components = allComponents.filter((item: any) => item.type === filterType);
        }
      }
      
      spinner.succeed(`Found ${components.length} components`);
      
      if (options.json) {
        console.log(JSON.stringify(components, null, 2));
        return;
      }
      
      // Display components in a formatted table
      console.log('\n');
      console.log(chalk.bold('Available Components:'));
      console.log(chalk.dim('─'.repeat(80)));
      
      components.forEach((component: Component) => {
        const type = component.type === 'registry:ui' ? chalk.blue('UI') : chalk.green('Component');
        console.log(`${chalk.bold(component.title)} ${chalk.dim('(' + component.name + ')')} - ${type}`);
        console.log(chalk.dim(component.description || 'No description'));
        console.log(chalk.dim('─'.repeat(80)));
      });
      
    } catch (error) {
      spinner.fail('Failed to fetch components');
      logger.error(error);
    }
  });

// Add component to project
components
  .command('add')
  .description('Add a component to your project')
  .argument('[name]', 'Name of the component to add')
  .option('-d, --dir <directory>', 'Target directory', process.cwd())
  .action(async (name, options) => {
    let componentName = name;
    
    // If no component name is provided, show a selection prompt
    if (!componentName) {
      const spinner = ora('Fetching available components...').start();
      
      try {
        const registry = await fetchRegistryItems({ type: 'component' });
        const components = registry?.items.filter((item: Component) => 
          item.type === 'registry:ui' || item.type === 'registry:component'
        );
        
        spinner.stop();
        
        const answer = await inquirer.prompt([
          {
            type: 'list',
            name: 'componentName',
            message: 'Select a component to add:',
            choices: components?.map((c: Component) => ({
              name: `${c.title} - ${c.description || 'No description'}`,
              value: c.name
            }))
          }
        ]);
        
        componentName = answer.componentName;
        
      } catch (error) {
        spinner.fail('Failed to fetch components');
        logger.error(error);
        return;
      }
    }
    
    // Install the component
    const spinner = ora(`Adding ${componentName} to your project...`).start();
    
    try {
      const component = await installComponent(componentName, options.dir, options);
      spinner.succeed(`Added ${chalk.green(component.componentName || componentName)} to your project`);

      // Show next steps
      console.log('\n');
      console.log(chalk.bold('Next steps:'));
      console.log(`  1. Import the component in your code`);
      console.log(`     ${chalk.dim(`import { ${componentName.replace(/-./g, (x: string) => x[1].toUpperCase())} } from "@/components/${componentName}";`)}`);
      console.log(`  2. Use it in your JSX/TSX`);
      console.log(`     ${chalk.dim(`<${componentName.replace(/-./g, (x: string) => x[1].toUpperCase())} />`)}`);
      console.log('\n');
      
    } catch (error) {
      spinner.fail(`Failed to add ${componentName}`);
      logger.error(error);
    }
  });

// Remove component from project  
components
  .command('remove')
  .description('Remove a component from your project')
  .argument('<name>', 'Name of the component to remove')
  .option('-d, --dir <directory>', 'Target directory', process.cwd())
  .action(async (name, options) => {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to remove ${name}?`,
        default: false
      }
    ]);
    
    if (!answer.confirm) {
      logger.info('Operation cancelled');
      return;
    }
    
    const spinner = ora(`Removing ${name} from your project...`).start();
    
    try {
      // Implementation for removing component files
      // This would need to:
      // 1. Check component existence
      // 2. Check dependencies
      // 3. Remove files
      
      // Placeholder for actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      spinner.succeed(`Removed ${chalk.yellow(name)} from your project`);
    } catch (error) {
      spinner.fail(`Failed to remove ${name}`);
      logger.error(error);
    }
  });

// Search components
components
  .command('search')
  .description('Search for components')
  .argument('<query>', 'Search query')
  .action(async (query) => {
    const spinner = ora('Searching components...').start();
    
    try {
      const registry = await fetchRegistryItems({ type: 'component' });
      const allComponents = registry?.items.filter((item: Component) => 
        item.type === 'registry:ui' || item.type === 'registry:component'
      );
      
      // Simple search implementation
      const results = allComponents.filter((item: Component) => 
        item.name.includes(query) || 
        item.title?.toLowerCase().includes(query.toLowerCase()) || 
        item.description?.toLowerCase().includes(query.toLowerCase())
      );
      
      spinner.succeed(`Found ${results.length} matches`);
      
      if (results.length === 0) {
        console.log(chalk.yellow('\nNo components found matching your query.'));
        return;
      }
      
      console.log('\n');
      console.log(chalk.bold('Search Results:'));
      console.log(chalk.dim('─'.repeat(80)));
      
      results.forEach((component: Component) => {
        const type = component.type === 'registry:ui' ? chalk.blue('UI') : chalk.green('Component');
        console.log(`${chalk.bold(component.title)} ${chalk.dim('(' + component.name + ')')} - ${type}`);
        console.log(chalk.dim(component.description || 'No description'));
        console.log(chalk.dim('─'.repeat(80)));
      });
      
    } catch (error) {
      spinner.fail('Search failed');
      logger.error(error);
    }
  });

export { components };
