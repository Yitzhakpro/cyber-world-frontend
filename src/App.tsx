import React, { useState } from 'react';
import { AuthWrapper } from './components';

function App(): JSX.Element {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div className="App">
            <AuthWrapper>
                <h1>Welcome</h1>
            </AuthWrapper>
        </div>
    );
}

export default App;
