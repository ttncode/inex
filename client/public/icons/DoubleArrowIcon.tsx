export default function DoubleArrowIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
}) {
  return (
    <svg width={width} height={height} fill={fill} viewBox="0 0 24 24" className="ML8tRx">
      <path
        d="M16 17.416l2.197-1.9a.48.48 0 0 1 .686.06l.005.007a.5.5 0 0 1-.06.694l-2.978 2.574a.478.478 0 0 1-.156.09.48.48 0 0 1-.544-.058l-2.977-2.573a.5.5 0 0 1-.06-.694l.005-.007a.48.48 0 0 1 .685-.06L15 17.448V5.5a.5.5 0 1 1 1 0v11.916zM9 6.584l2.197 1.899a.48.48 0 0 0 .686-.06l.005-.007a.5.5 0 0 0-.06-.694L8.85 5.15a.478.478 0 0 0-.156-.09.48.48 0 0 0-.544.058L5.173 7.69a.5.5 0 0 0-.06.694l.005.007a.48.48 0 0 0 .685.06L8 6.55V18.5a.5.5 0 0 0 1 0V6.584z"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}
