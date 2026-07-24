import React from "react"
import { useState, useEffect } from "react"

export default function Countdown({ totalTime, isGameOver, isGameLost, isGameWon, isRunning, newGame }) {
    const [timeLeft, setTimeLeft] = useState(totalTime)

    useEffect(() => {
        setTimeLeft(totalTime)
    }, [newGame, totalTime])

    useEffect(() => {
        if (!isRunning) return;
        if (timeLeft <= 0) return;
        if (isGameOver || isGameLost || isGameWon) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isGameOver, isGameLost, isGameWon, isRunning, totalTime]);

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const percent = Math.max(0, timeLeft / totalTime);
    const strokeDashoffset = circumference * (1 - percent);

    return (
        <section className="countdown-container">
            <div className="countdown-circle" style={{ position: 'relative' }}>
                <svg
                    width="130"
                    height="130"
                    style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
                >
                    <circle
                        cx="65"
                        cy="65"
                        r={radius}
                        fill="none"
                        stroke={timeLeft <= 5 ? "#fa000c" : "#F9F4DA"}
                        strokeWidth="4"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s linear', marginBottom: '0' }}
                    />
                </svg>
                <h2 className="countdown-timer">{timeLeft}</h2>
            </div>
        </section>
    )
}