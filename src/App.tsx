import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper, ChatLayout } from './components';

function App(): JSX.Element {
    return (
        <div className="App">
            <AuthWrapper>
                <BrowserRouter>
                    <ChatLayout />
                </BrowserRouter>
            </AuthWrapper>
        </div>
    );
}

export default App;
