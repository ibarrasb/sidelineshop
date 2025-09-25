import React from 'react'

function Loading() {
    return (
        <div className="flex justify-center items-center p-8">
            <svg width="205" height="250" viewBox="0 0 40 50" className="animate-pulse">
                <polygon stroke="#000" strokeWidth="1" fill="none"
                points="20,1 40,40 1,40"/>
                <text fill="#000" x="5" y="47">Loading</text>
            </svg>
        </div>
    )
}

export default Loading
