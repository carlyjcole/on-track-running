import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Typed from 'typed.js'; 

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const typed = new Typed('.title', {
            strings: ['let\'s get you back', 'on track'],
            typeSpeed: 250,
            loop: false,
        });

        return () => {
            typed.destroy();
        };
    }, []); 

    const handleClick = async () => {
        try {
            console.log("clicked");
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen"
            style={{
                backgroundColor: 'rgb(255, 254, 247)',
                height: 'calc(100vh - 80px)'
            }}>
            <header className="text-center py-8">
                <h2>you've encountered an error.</h2>
                <h1 className="text-5xl font-bold">
                    <span className="title"></span>
                </h1>
            </header>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClick}
                className="bg-lightblue text-white font-wotfard text-l py-2 px-4 rounded mt-4"
            >
                back to home
            </motion.button>
        </div>
    );
}

export default Error;
