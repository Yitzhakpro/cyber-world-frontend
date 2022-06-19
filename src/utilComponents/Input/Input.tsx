import * as React from 'react';
import './input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    test?: boolean;
}

function Input(props: InputProps): JSX.Element {
    const { test = false } = props;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <input className="custom-cyber-input" {...props} />;
}

export default Input;
