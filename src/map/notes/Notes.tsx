import { FunctionComponent, ReactElement, useState } from 'react';
import './Notes.css';

import Button from './Button';
import Form from './Form';
import type Note from './Note';
import Pin from './Pin';

interface NotesProps {
    addNote: (note: Note) => void | Promise<void>;
    lng: number;
    lat: number;
}

enum States {
    Idle,
    ChooseLocation,
    AddNote,
}

const Notes: FunctionComponent<NotesProps> = ({ addNote, lng, lat }) => {
    const [state, setState] = useState<States>(States.Idle);

    const submitNotesForm = (note: Omit<Note, 'lat' | 'lng'>) => {
        setState(States.Idle);

        const noteAtPosition = { ...note, lng, lat };
        addNote(noteAtPosition);
    };

    const renderButtons = (): ReactElement => {
        switch (state) {
            case States.ChooseLocation:
            case States.AddNote:
                return (
                    <>
                        <Button
                            onClick={() => setState(States.Idle)}
                            secondary={true}
                        >
                            X
                        </Button>
                        <Button onClick={() => setState(States.AddNote)}>
                            Set the pin here
                        </Button>
                    </>
                );
            default:
                return (
                    <Button onClick={() => setState(States.ChooseLocation)}>
                        Add a note
                    </Button>
                );
        }
    };

    const maybeRenderPin = (): ReactElement | void => {
        switch (state) {
            case States.ChooseLocation:
            case States.AddNote:
                return <Pin />;
            default:
                return;
        }
    };

    const maybeRenderForm = (): ReactElement | void => {
        switch (state) {
            case States.AddNote:
                return <Form onSubmit={submitNotesForm} />;
            default:
                return;
        }
    };

    return (
        <>
            <div className="notes-buttons-container">{renderButtons()}</div>
            {maybeRenderPin()}
            {maybeRenderForm()}
        </>
    );
};

export default Notes;
