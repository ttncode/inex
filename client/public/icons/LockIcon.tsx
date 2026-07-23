export default function LockIcon({
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
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox="0 0 11 14"
      xmlns="http://www.w3.org/2000/svg"
      className="RtnbAi"
      data-hook="SecureCheckoutDataHook.lock"
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="M0 12.79c0 .558.445 1.01.996 1.01h9.008A1 1 0 0 0 11 12.79V6.01c0-.558-.445-1.01-.996-1.01H.996A1 1 0 0 0 0 6.01v6.78Z"></path>
        <path
          d="M9.5 5v-.924C9.5 2.086 7.696.5 5.5.5c-2.196 0-4 1.586-4 3.576V5h1v-.924c0-1.407 1.33-2.576 3-2.576s3 1.17 3 2.576V5h1Z"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
}
