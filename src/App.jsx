import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import DashboardLayout from './components/DashboardLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import MyBooksPage from './pages/MyBooksPage';
import EventPage from './pages/EventPage';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage';

function App() {
    return (
        <Authenticator.Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DashboardLayout />}>
                        {/* 公共页面（无需登录） */}
                        <Route index element={<HomePage />} />
                        <Route path="subject/:id" element={<BookDetailPage />} />
                        <Route path="login" element={<LoginPage />} />

                        {/* 受保护页面（需登录） */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="my-books" element={<MyBooksPage />} />
                            <Route path="events" element={<EventPage />} />
                            <Route path="map" element={<MapPage />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Authenticator.Provider>
    );
}

export default App;
