import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">404</h1>
                <p className="text-xl mt-4">Oops! Page not found or We are working on this page😵.</p>
            </div>
        </div>
    );
};

export default NotFound;