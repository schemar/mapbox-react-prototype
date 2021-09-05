import { FunctionComponent, ReactElement } from 'react';
import './Popup.css';

import { Note } from './Notes';

interface FormProps {
    note: Note;
}

const Popup: FunctionComponent<FormProps> = ({ note }) => {
    const renderPropertyOrPlaceholder = (
        property: string | undefined,
    ): ReactElement => {
        if (!property) {
            return <span className="note-popup-empty">empty</span>;
        }

        return <>{property}</>;
    };

    return (
        <div className="note-popup">
            <dl>
                <dt>Question 1</dt>
                <dd>{renderPropertyOrPlaceholder(note.answerOne)}</dd>
                <dt>Question 2</dt>
                <dd>{renderPropertyOrPlaceholder(note.answerTwo)}</dd>
                <dt>Question 3</dt>
                <dd>{renderPropertyOrPlaceholder(note.answerThree)}</dd>
                <dt>Upload</dt>
                <dd>{renderPropertyOrPlaceholder(note.file)}</dd>
            </dl>
        </div>
    );
};

export default Popup;
