import { FunctionComponent } from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps {
    onClick: () => void | Promise<void>;
    secondary?: boolean;
}

const Notes: FunctionComponent<ButtonProps> = ({
    onClick,
    secondary = false,
    children,
}) => {
    return (
        <button
            type="button"
            className={classNames({
                'notes-button': true,
                'notes-button-secondary': secondary,
            })}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Notes;
