import type Note from '../map/notes/Note';

// Fake "server".

const notesStorage = 'notes';

export const fetchNotes = (): Note[] => {
    const storedData = window.localStorage.getItem(notesStorage);
    if (storedData) {
        return JSON.parse(storedData);
    } else {
        return [];
    }
};

export const putNotes = (notes: Note[]) => {
    window.localStorage.setItem(notesStorage, JSON.stringify(notes));
};

export const postNote = (note: Note) => {
    const notes = fetchNotes();
    putNotes([...notes, note]);
};
