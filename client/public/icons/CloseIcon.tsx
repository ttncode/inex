export default function CloseIcon({
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
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill={fill}>
      <path
        fillRule="evenodd"
        d="M11.077 0L12 .923 6.923 6 12 11.077l-.923.923L6 6.923.923 12 0 11.077 5.076 6 0 .923.923 0 6 5.077 11.077 0z"
      ></path>
    </svg>
  );
}
