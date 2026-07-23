export default function GridViewIcon({
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
      width={width}
      height={height}
      fill={fill}
      className="lg:block sms:hidden"
      viewBox="0 0 13 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs></defs>
      <g id="Symbols" stroke="none" strokeWidth="1" fillRule="evenodd">
        <g id="Filter-Header" transform="translate(-559.000000, -7.000000)">
          <g id="Search-and-Sort" transform="translate(0.000000, 5.000000)">
            <g id="Layouts" transform="translate(559.000000, 2.000000)">
              <path
                d="M0,0 L3,0 L3,3 L0,3 L0,0 Z M5,0 L8,0 L8,3 L5,3 L5,0 Z M10,0 L13,0 L13,3 L10,3 L10,0 Z M0,5 L3,5 L3,8 L0,8 L0,5 Z M5,5 L8,5 L8,8 L5,8 L5,5 Z M10,5 L13,5 L13,8 L10,8 L10,5 Z M0,10 L3,10 L3,13 L0,13 L0,10 Z M5,10 L8,10 L8,13 L5,13 L5,10 Z M10,10 L13,10 L13,13 L10,13 L10,10 Z"
                id="Combined-Shape"
              ></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
