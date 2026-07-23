export default function LogoIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      preserveAspectRatio="xMidYMid meet"
      data-bbox="78.5 78.5 43 43"
      viewBox="78.5 78.5 43 43"
      xmlns="http://www.w3.org/2000/svg"
      data-type="shape"
      role="presentation"
      aria-hidden="true"
    >
      <g>
        <path fillRule="evenodd" clipRule="evenodd" d="M80.8 78.5l-2.3 1.6 10 14.5 1.6-2.4-9.3-13.7z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M92.6 78.5l-2.5 1.7 4.5 6.4 1.8-2.6-3.8-5.5z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M107.5 78.5l-29 40.5 2.4 1.6 29-40.5-2.4-1.6z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M119.1 78.5l-29 40.5 2.4 1.6 29-40.5-2.4-1.6z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M109.9 106.9l9.3 13.7 2.3-1.6-10-14.5-1.6 2.4z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M103.6 116l3.8 5.5 2.5-1.7-4.5-6.4-1.8 2.6z"></path>
      </g>
    </svg>
  );
}
