interface NorthBridgeMarkProps {
  size?: number;
  className?: string;
}

/** NorthBridge Credit mark, from LLMs/NorthBridge_Brand/northbridge-mark-currentcolor.svg. */
const NorthBridgeMark = ({ size = 20, className }: NorthBridgeMarkProps) => (
  <svg
    width={size}
    height={size}
    viewBox="14 18 68 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="NorthBridge"
    className={className}
  >
    <path d="M19 74V22H30.5V54.8L65.5 22H77V74H65.5V40.9L30.5 74H19Z" fill="currentColor" />
    <path d="M19 82H77" stroke="currentColor" strokeWidth="6" strokeLinecap="square" />
  </svg>
);

export default NorthBridgeMark;
