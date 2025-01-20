import React from 'react';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <div className="size-52 block m-auto">
                    <img src="icons/inProgress(3).gif" alt="503 Error" className=' w-full h-full' />
                </div>
                <h1 className="text-4xl font-bold text-red-600">503</h1>
                <p className="text-xl mt-4">Oops! Data is currently unavailable, but we are working on it😵.</p>
            </div>
        </div>
    );
};

export default NotFound;