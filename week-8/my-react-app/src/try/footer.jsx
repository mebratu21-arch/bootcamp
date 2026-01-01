import React from 'react';
const websiteName = "My Website";
function Footer() {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} ,{websiteName}2025</p>
        </footer>
    );
}

export default Footer;