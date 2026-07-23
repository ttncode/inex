export default function PlusIcon({
  width = "16px",
  height = "16px",
  fill = "currentColor",
  className,
}: {
  width?: string | number;
  height?: string | number;
  fill?: string;
  className?: any;
}) {
  return (
    <svg className={className} viewBox="0 0 20 20" width={width} height={height} fill={fill}>
      <path
        fillRule="evenodd"
        d="M11,5 L10.999,10 L16,10 L16,11 L11,11 L11,16 L10,16 L9.999,11 L5,11 L5,10 L10,9.999 L10,5 L11,5 Z"
      ></path>
    </svg>
  );
}
