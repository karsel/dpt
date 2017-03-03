import program from 'commander';
import scaffold from 'dpt-scaffold';

import Path from 'path';

import { dedent } from './util';
import logger from './logger';

async function init(name) {
    try {
        await scaffold(
            Path.resolve(__dirname, '../templates/project'),
            process.cwd(), { name }
        );
        console.log(dedent(`
            Project ${name} was created successully.
            
            Use the following commands to start now:
            cd ${name}
            npm install
            npm start`
        ));
    } catch (e) {
        logger.error(`An error occurred while creating project ${name}:\n${e}`);
    }
}

program
    .version('0.1.0')
    .usage('dpt <command> [options]')

.command('init <name>')
    .description('Create a Depot project')
    .action(init);

if (process.argv.length <= 2) {
    program.help();
    // require('./index.js');
} else {
    program.parse(process.argv);
}