const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

yargs.version('1.1.0');

//create add command
yargs.command({
	command: 'add',
	describe: 'Add a New Note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		},
		body: {
			describe: 'body of the note',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.addNotes(argv.title, argv.body);
	}
});

//create Remove command
yargs.command({
	command: 'remove',
	description: 'Removing a Note',
	builder: {
		title: {
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv) {
		notes.removeNote(argv.title);
	}
});

//create List  command
yargs.command({
	command: 'list',
	description: 'list all Notes',
	handler() {
		notes.listNotes();
	}
});

//create read command
yargs.command({
	command: 'read',
	description: 'Read a Note',
	handler() {
		console.log(chalk.blue.inverse('Reading the Note'));
	}
});
yargs.parse();
