export default function PasswordIcon({
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
      className="inputIcon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      fill={fill}
    >
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
  );
}
