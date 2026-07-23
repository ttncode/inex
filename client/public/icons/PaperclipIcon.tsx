export default function PaperclipIcon({
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
      className="rotate-45 hover:fill-paragraph hover:stroke-paragraph lg:w-[16px] lg:h-[16px] sms:w-[24px] sms:h-[24px]"
      viewBox="0 0 9 23"
      fill={fill}
      width={width}
      height={height}
    >
      <path d="M4.5,23A4.5,4.5,0,0,1,0,18.5V4.5a4.5,4.5,0,0,1,9,0H8a3.5,3.5,0,0,0-7,0v14a3.5,3.5,0,0,0,7,0v-9a1.5,1.5,0,0,0-3,0V17H4V9.5a2.5,2.5,0,0,1,5,0v9A4.5,4.5,0,0,1,4.5,23Z"></path>
    </svg>
  );
}
