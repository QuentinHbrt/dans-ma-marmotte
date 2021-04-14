import React, { FC } from 'react';

function getYear() {
    return (
        <p>
            {(new Date().getFullYear())}
        </p>
    )
}

export const Footer: FC = () => {
    return (
        <footer className="footer footer-transparent">
            <div className="text-center">
                <p>DMM © {getYear()}</p>
            </div>
        </footer>
    )
}