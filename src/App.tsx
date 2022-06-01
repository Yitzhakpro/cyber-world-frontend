import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthWrapper, RoomSelect, ChatRoom } from './components';

function App(): JSX.Element {
    return (
        <div className="App">
            <AuthWrapper>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<RoomSelect />} />
                        <Route path=":roomID" element={<ChatRoom />} />
                    </Routes>
                </BrowserRouter>
            </AuthWrapper>
        </div>
    );
}

export default App;
