const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// Customise yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            //to make the title compulsory
            demandOption: true,
            // to accept title value as string only
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title: {
            describe: 'Note with title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Create list command
yargs.command({
    command: 'list',
    describe: 'Lists the current notes',
    handler() {
        notes.listNotes();
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Reads the notes',
    builder: {
        title: {
            describe: 'Title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//below is compulsory to get the command output
//yargs.argv
// or we can also use this
yargs.parse()


