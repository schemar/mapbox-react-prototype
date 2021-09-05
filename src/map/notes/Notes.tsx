import { FunctionComponent, ReactElement, useState } from 'react';
import './Notes.css';

import Button from './Button';
import Form from './Form';
import Pin from './Pin';

export interface Note {
    lat: number;
    lng: number;
    answerOne: string;
    answerTwo: string;
    answerThree: string;
    file: string;
}

interface NotesProps {
    lat: number;
    lng: number;
    onChange: (notes: Note[]) => void | Promise<void>;
}

enum States {
    Idle,
    ChooseLocation,
    AddNote,
}

const Notes: FunctionComponent<NotesProps> = ({ lat, lng, onChange }) => {
    const [state, setState] = useState<States>(States.Idle);
    const [notes, setNotes] = useState<Note[]>([]);

    const submitNotesForm = (note: Omit<Note, 'lat' | 'lng'>) => {
        setState(States.Idle);

        const noteAtPosition = { ...note, lat, lng };
        const updatedNotes = [...notes, noteAtPosition];
        setNotes(updatedNotes);
        onChange(updatedNotes);
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
