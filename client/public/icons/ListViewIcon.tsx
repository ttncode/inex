export default function ListViewIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
}) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 16 13" xmlns="http://www.w3.org/2000/svg">
      <defs></defs>
      <g stroke="none" strokeWidth="1" fillRule="evenodd">
        <g>
          <path d="M5,0 L16,0 L16,3 L5,3 L5,0 Z M0,0 L3,0 L3,3 L0,3 L0,0 Z M5,5 L16,5 L16,8 L5,8 L5,5 Z M0,5 L3,5 L3,8 L0,8 L0,5 Z M5,10 L16,10 L16,13 L5,13 L5,10 Z M0,10 L3,10 L3,13 L0,13 L0,10 Z"></path>
        </g>
      </g>
    </svg>
  );
}
