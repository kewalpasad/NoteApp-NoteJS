const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
	return 'This is my notes';
};

const addNotes = (title, body) => {
	const notes = loadNotes();
	const duplicateNotes = notes.filter(note => note.title === title);

	if (duplicateNotes.length === 0) {
		notes.push({
			title: title,
			body: body
		});
		console.log(chalk.green.inverse('New Note addad'));
	} else {
		console.log(
			chalk.yellow.inverse(
				'Note title already exists please change the title of your note'
			)
		);
	}

	saveNotes(notes);
};

const saveNotes = notes => {
	const dataJson = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJson);
};

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJson = dataBuffer.toString();
		return JSON.parse(dataJson);
	} catch (error) {
		return [];
	}

	const dataBuffer = fs.readFileSync('notes.json');
	const dataJson = dataBuffer.toString();
	return JSON.parse(dataJson);
};

const removeNote = title => {
	const notes = loadNotes();

	const notesToKeep = notes.filter(note => note.title !== title);

	if (notes.length > notesToKeep.length) {
		console.log(chalk.red.inverse(`${title} is deleted`));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.yellow.inverse('No Such Title Found'));
	}
	// saveNotes(notes);
};

const listNotes = () => {
	const notes = loadNotes();
	notes.forEach(note => {
		return console.log(chalk.inverse(`Title: ${note.title}`));
	});
};

module.exports = {
	getNotes: getNotes,
	addNotes: addNotes,
	removeNote: removeNote,
	listNotes: listNotes
};
