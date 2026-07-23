export default function DownIcon({
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
      width={width}
      height={height}
      fill={fill}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 11 6"
      className="xR9F7 ma-members-list-icon-color sms:h-4 sms:w-4 lg:h-auto lg:w-auto"
    >
      <path
        d="M846.007,697.852l-5.251,5.156-0.256-.252-0.256.252-5.252-5.156,0.876-.859,4.632,4.548,4.632-4.548Z"
        transform="translate(-835 -697)"
      ></path>
    </svg>
  );
}
