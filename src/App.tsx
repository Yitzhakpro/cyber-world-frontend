import React from 'react';
import { AuthWrapper, Chat } from './components';

function App(): JSX.Element {
    return (
        <div className="App">
            <AuthWrapper>
                <Chat />
            </AuthWrapper>
        </div>
    );
}

export default App;
