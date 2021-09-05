import { FunctionComponent } from 'react';
import pin from './pin.png';
import './Pin.css';

interface PinProps {}

const Pin: FunctionComponent<PinProps> = () => {
    return <img src={pin} alt="A pin on the map." className="notes-pin" />;
};

export default Pin;
