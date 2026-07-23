export default function MinusIcon({
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
      <path fillRule="evenodd" d="M15.5,10 L15.5,11 L4.5,11 L4.5,10 L15.5,10 Z"></path>
    </svg>
  );
}
