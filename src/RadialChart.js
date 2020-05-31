import React, { useEffect } from 'react';

const RadialChart = ({ max, value, label, colour }) => {

  const circumference = 45 * 2 * 3.14
  const progress = circumference / max * value

  useEffect(() => {
    
  })

  return (
    <svg viewBox="0 0 160 106.5" xmlns="http://www.w3.org/2000/svg">
        <circle 
            cx="80" 
            cy="53" 
            r="45" 
            fill="none" 
            stroke="#e3e1e1" 
            stroke-width="15"
        />
        <circle 
            cx="80" 
            cy="53" 
            r="45" 
            fill="none" 
            stroke={colour}
            stroke-width="15"
            stroke-dasharray={`${progress}, ${circumference}`}
            stroke-linecap="round" 
            transform="rotate(270, 80, 53)"
        />
        <text 
          x="80" 
          y="56" 
          fill="Black" 
          text-anchor="middle"
          font-family="Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;"
        >
          {label}
        </text>
    </svg>
  )
}

export default RadialChart