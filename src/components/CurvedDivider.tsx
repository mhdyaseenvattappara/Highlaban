import React from 'react';

interface CurvedDividerProps {
  position?: 'top' | 'bottom';
  fill?: string;
  height?: string;
  className?: string;
}

const CurvedDivider: React.FC<CurvedDividerProps> = ({ 
  position = 'bottom', 
  fill = '#f0f9ff', 
  height = '60px',
  className = ''
}) => {
  // Simple wave SVG path
  const path = "M0,32L60,48C120,64,240,96,360,96C480,96,600,64,720,48C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96V192H1380C1320,192,1200,192,1080,192C960,192,840,192,720,192C600,192,480,192,360,192C240,192,120,192,60,192H0V32Z";
  
  // Transform for top vs bottom
  // If top, we might want to flip it vertically or just use a different path
  // For simplicity, let's just rotate it 180deg if it's 'top' to connect to the previous section
  const transform = position === 'top' ? 'rotate(180)' : '';
  const style = { 
    height, 
    width: '100%',
    transform,
    display: 'block' // Remove extra spacing
  };

  return (
    <div className={`overflow-hidden w-full leading-none ${className}`} style={{ lineHeight: 0 }}>
      <svg 
        viewBox="0 0 1440 192" 
        preserveAspectRatio="none" 
        style={style}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill} fillOpacity="1" d={path} />
      </svg>
    </div>
  );
};

export default CurvedDivider;
