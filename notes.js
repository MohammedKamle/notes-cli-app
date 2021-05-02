const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
        const notes = loadNotes()
        // Below is less efficient code as we are going through each and every note even when we find a duplicate
        // const duplicateNotes = notes.filter((note) => {
        //         return note.title === title;
        // })
        // A more efficient code using "find", it will exit as soon as it find the duplicate
        const duplicateNote = notes.find((note) => {
                return note.title === title;
        })
        debugger
        if (!duplicateNote) {
                notes.push({
                        title: title,
                        body: body
                })
                saveNotes(notes)
                console.log(chalk.green.inverse('New note added!'))
        } else {
                console.log(chalk.red.inverse('Please use a different title as this title is already taken!'))
        }


}

const saveNotes = (notes) => {
        const dataJSON = JSON.stringify(notes)
        fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
        try {
                const dataBuffer = fs.readFileSync('notes.json')
                const dataJson = dataBuffer.toString()
                return JSON.parse(dataJson)
        }
        catch (e) {
                return []
        }
}

const removeNote = (title) => {
        const notes = loadNotes()
        const modifiedNotesArray = notes.filter(note => {
                return note.title !== title
        })
        if (notes.length > modifiedNotesArray.length) {
                saveNotes(modifiedNotesArray)
                console.log(chalk.green(`Note with titile '${title}' removed!`))
        } else {
                console.log(chalk.red(`Note with title '${title}' not found`))
        }
}

const listNotes = () => {
        const notes = loadNotes();
        console.log(chalk.blue.inverse('Your Notes: \n'))
        notes.forEach((note, index) => {
                console.log(`${index + 1}) ${chalk.yellow('Title:')} ${note.title} ${chalk.yellow('Body:')} ${note.body}\n`)
        })
}

const readNote = (title) => {
        const notes = loadNotes();
        const noteWithTitleSpecified = notes.find(note => note.title === title)
        if (noteWithTitleSpecified) {
                console.log(`${chalk.inverse(`${noteWithTitleSpecified.title}`)}`)
                console.log(noteWithTitleSpecified.body)
        } else {
                console.log(chalk.red('Note with title ' + title + ' not found'))
        }

}

module.exports = {
        addNote: addNote,
        removeNote: removeNote,
        listNotes: listNotes,
        readNote: readNote
}