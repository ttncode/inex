export default function ArrowIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
  style,
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
  style?: Object;
}) {
  return (
    <svg
      preserveAspectRatio="xMidYMid meet"
      data-bbox="1.95 9.05 56.15 42"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="1.95 9.05 56.15 42"
      role="presentation"
      aria-hidden="true"
      width={width}
      height={height}
      fill={fill}
      style={style}
    >
      <g>
        <path d="M56.5 27.6H10.4l14.7-14.7c.6-.6.6-1.6 0-2.2L24 9.5c-.6-.6-1.6-.6-2.2 0L2.4 28.9c-.6.6-.6 1.6 0 2.2l1.2 1.2 18.3 18.3c.6.6 1.6.6 2.2 0l1.2-1.2c.6-.6.6-1.6 0-2.2L10.4 32.4h46.1c.9 0 1.6-.7 1.6-1.6v-1.7c0-.8-.7-1.5-1.6-1.5z"></path>
      </g>
    </svg>
  );
}
