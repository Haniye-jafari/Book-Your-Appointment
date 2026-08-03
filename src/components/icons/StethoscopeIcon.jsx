const StethoscopeIcon = ({ size = 24, color = "currentColor", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 2v2"/>
    <path d="M5 2v2"/>
    <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/>
    <path d="M8 15a6 6 0 0 0 12 0v-3"/>
    <circle cx="20" cy="10" r="2"/>
  </svg>
);

export default StethoscopeIcon;