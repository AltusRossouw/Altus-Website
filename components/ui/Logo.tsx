export default function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background shape - hexagon-like */}
      <path 
        d="M16 2L28 9V23L16 30L4 23V9L16 2Z" 
        stroke="#27272A" 
        strokeWidth="1.5"
        fill="#141415"
      />
      
      {/* Circuit traces */}
      <path 
        d="M16 2V8" 
        stroke="#00D4FF" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle cx="16" cy="8" r="1.5" fill="#00D4FF" />
      
      {/* Letter A stylized */}
      <path 
        d="M11 20L16 10L21 20" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M12.5 17H19.5" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      
      {/* Tech accents */}
      <circle cx="28" cy="9" r="1.5" fill="#00D4FF" />
      <circle cx="4" cy="23" r="1.5" fill="#00D4FF" />
    </svg>
  )
}