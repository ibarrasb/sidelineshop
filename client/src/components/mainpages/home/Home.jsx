import React from 'react';
import {Link} from 'react-router-dom'

function Home() {
    return (
        <div className="text-center py-20">
            <h1 className="text-6xl font-dancing mb-8 text-sideline-text">Welcome to Sideline Shop</h1>
            <p className="text-xl mb-8 text-sideline-text">The go to official place to shop for any sports product! Every item is guaranteed authentic, and for the best price you can find anywhere.</p>
            <p className="text-xl mb-8 text-sideline-text">Login or create a new account to shop your favorite team or players items before they run out!</p>
            <Link to="/login" className="bg-sideline-accent text-white px-8 py-4 rounded-lg uppercase tracking-wider font-semibold hover:bg-opacity-90 transition-all">Get Started</Link>
        </div>
    );
}

export default Home;
