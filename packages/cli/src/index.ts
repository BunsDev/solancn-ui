import { Command } from 'commander';
import { init } from './commands/init';
import { components } from './commands/components';
import { blocks } from './commands/blocks';
import { theme } from './commands/theme';
import { dev } from './commands/dev';

const program = new Command();

program
  .name('solancn')
  .description('CLI for SolancnUI design system')
  .version('0.0.1');

program
  .command('init')
  .description('Initialize a new project with SolancnUI')
  .action(init);

program
  .command('components')
  .description('Manage components')
  .addCommand(components);

program
  .command('blocks')
  .description('Manage blocks')
  .addCommand(blocks);

program
  .command('theme')
  .description('Manage theme')
  .addCommand(theme);

program
  .command('dev')
  .description('Start development server')
  .action(dev);

program.parse();