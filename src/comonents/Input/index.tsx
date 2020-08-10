import React, { InputHTMLAttributes } from 'react';
import './style.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    inputName: string;
    inputLabel: string;

}
const Input: React.FC<InputProps> = ({ inputName, inputLabel, ...rest }) => {
    return (
        <div className="input-block">
            <label htmlFor={inputName}> {inputLabel} </label>
            <input type="text" id={inputName} {...rest} />
        </div>
    );
}

export default Input;