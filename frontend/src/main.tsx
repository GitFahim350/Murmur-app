import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Timeline from './pages/Timeline';
import MurmurDetail from './pages/MurmurDetail';
import UserMe from './pages/UserMe';
import UserShow from './pages/UserShow';
import './styles.css';


function Layout() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <header className="flex gap-4 items-center mb-4">
                <Link to="/" className="text-xl font-bold">Murmur</Link>
                <nav className="text-sm gap-3 flex">
                    <Link to="/">Timeline</Link>
                    <Link to="/me">Me</Link>
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<Timeline />} />
                <Route path="/murmurs/:id" element={<MurmurDetail />} />
                <Route path="/me" element={<UserMe />} />
                <Route path="/users/:id" element={<UserShow />} />
            </Routes>
        </div>
    );
}


createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </React.StrictMode>
);