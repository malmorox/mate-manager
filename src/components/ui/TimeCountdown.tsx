import React, { useState, useEffect } from "react";

const TimeCountdown: React.FC = () => {
    const startDate = new Date("October 10, 2024 22:15:00").getTime();

    const [timeElapsed, setTimeElapsed] = useState(() => calculateTimeElapsed());

    function calculateTimeElapsed() {
        const now = new Date().getTime();
        const difference = now - startDate;

        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor(
        (difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
        );
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { years, months, days, hours, minutes, seconds };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(calculateTimeElapsed());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTimeUnit = (value: number, unit: string) => {
        const isSingular = value === 1;
        let unitString = isSingular ? `${value} ${unit}` : `${value} ${unit}s`;

        if (unit === "mes") {
            unitString = isSingular ? `${value} ${unit}` : `${value} ${unit}es`;
        }

        return <span className="countdown-time-unit">{unitString}</span>;
    };

    const buildTimeText = () => {
        const parts: JSX.Element[] = [];
        if (timeElapsed.years > 0) parts.push(formatTimeUnit(timeElapsed.years, "año"));
        if (timeElapsed.months > 0) parts.push(formatTimeUnit(timeElapsed.months, "mes"));
        if (timeElapsed.days > 0) parts.push(formatTimeUnit(timeElapsed.days, "día"));
        if (timeElapsed.hours > 0) parts.push(formatTimeUnit(timeElapsed.hours, "hora"));
        if (timeElapsed.minutes > 0) parts.push(formatTimeUnit(timeElapsed.minutes, "minutos"));
        if (timeElapsed.seconds > 0) parts.push(formatTimeUnit(timeElapsed.seconds, "segundos"));
        
        if (parts.length === 1) return parts[0];

        const lastPart = parts.pop();
        return `${parts.join(", ")} y ${lastPart}`;
    };

    return (
        <div className="text-center">
            <span>
                Llevamos juntos {buildTimeText()}.
            </span>
        </div>
    );
};

export default TimeCountdown;