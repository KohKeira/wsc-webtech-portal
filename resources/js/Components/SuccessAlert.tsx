import React, { ReactNode } from 'react';

const SuccessAlert: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    return (
        <div
            className="mb-10 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400"
            role="alert"
        >
            <span className="font-medium">{children}</span>
        </div>
    );
};

export default SuccessAlert;
