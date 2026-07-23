export default function MultiplyIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
  style?: Object;
}) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="12" opacity=".06"></circle>
      <path
        d="M18 6.707L17.293 6 12 11.293 6.707 6 6 6.707 11.293 12 6 17.293l.707.707L12 12.707 17.293 18l.707-.707L12.707 12 18 6.707z"
        fill-rule="evenodd"
      ></path>
    </svg>
  );
}
