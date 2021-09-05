import { ChangeEvent, FormEvent, FunctionComponent, useState } from 'react';
import './Form.css';

import { Note } from './Notes';

interface FormProps {
    onSubmit: (note: Omit<Note, 'lat' | 'lng'>) => void | Promise<void>;
}

const Form: FunctionComponent<FormProps> = ({ onSubmit }) => {
    const [answers, setAnswers] = useState<Omit<Note, 'lat' | 'lng'>>({
        answerOne: '',
        answerTwo: '',
        answerThree: '',
        file: '',
    });

    const onChange = (key: keyof Note) => {
        return (event: ChangeEvent<{ value: string }>) => {
            const value = event.target.value;
            setAnswers({ ...answers, [key]: value });
        };
    };

    return (
        <div className="notes-form-container">
            <h3>Title</h3>
            <form
                className="notes-form"
                onSubmit={(event: FormEvent) => {
                    event.preventDefault();
                    event.stopPropagation();

                    const note: Omit<Note, 'lat' | 'lng'> = answers;
                    onSubmit(note);
                }}
            >
                <label htmlFor="notes-form-answer-one">Question 1</label>
                <input
                    type="text"
                    id="notes-form-answer-one"
                    name="notes-form-answer-one"
                    placeholder="Answer 1"
                    onChange={onChange('answerOne')}
                />
                <label htmlFor="notes-form-answer-two">Question 2</label>
                <input
                    type="text"
                    id="notes-form-answer-two"
                    name="notes-form-answer-two"
                    placeholder="Answer 2"
                    onChange={onChange('answerTwo')}
                />
                <label htmlFor="notes-form-answer-three">Question 3</label>
                <input
                    type="text"
                    id="notes-form-answer-three"
                    name="notes-form-answer-three"
                    placeholder="Answer 3"
                    onChange={onChange('answerThree')}
                />
                <label htmlFor="notes-form-upload">Upload</label>
                <input
                    type="file"
                    id="notes-form-upload"
                    name="notes-form-upload"
                    onChange={onChange('file')}
                />
                <button type="submit" className="notes-form-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Form;
