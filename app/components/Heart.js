export default function Heart({ handleClick, isFavorite, className, handleAddToFavorites }) {
  const handleHeartClick = (event) => {
    event.stopPropagation();
    handleAddToFavorites();
  };

  return (
    <div className={className}>
      <span onClick={handleHeartClick}>
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="25"
            height="25"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
          >
            <defs></defs>
            <g
              style={{
                stroke: 'none',
                strokeWidth: 0,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
                strokeMiterlimit: 10,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1,
              }}
              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
            >
              <path
                d="M 83.627 13.423 L 83.627 13.423 c -8.498 -8.498 -22.403 -8.498 -30.901 0 L 45 21.148 l -7.725 -7.725 c -8.498 -8.498 -22.403 -8.498 -30.901 0 s -8.498 22.403 0 30.901 l 13.247 13.247 c 0 0 0 0 0 0 L 45 82.951 l 25.379 -25.379 l 13.248 -13.248 C 92.124 35.826 92.124 21.921 83.627 13.423 z"
                style={{
                  stroke: 'none',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  fill: '#fff',
                  fillRule: 'nonzero',
                  opacity: 1,
                }}
                transform="matrix(1 0 0 1 0 0)"
                strokeLinecap="round"
              />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="25"
            height="25"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
          >
            <defs></defs>
            <g
              style={{
                stroke: 'none',
                strokeWidth: 0,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
                strokeMiterlimit: 10,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1,
              }}
              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
            >
              <path
                d="M 45 84.9 L 6.95 46.85 C 2.468 42.368 0 36.409 0 30.071 c 0 -6.338 2.468 -12.296 6.95 -16.778 c 9.252 -9.25 24.306 -9.251 33.556 0 L 45 17.787 l 4.494 -4.494 c 9.251 -9.251 24.303 -9.253 33.556 0 c 9.252 9.251 9.252 24.305 0 33.557 L 45 84.9 z M 23.728 12.352 c -4.54 0 -9.08 1.728 -12.536 5.184 C 7.844 20.884 6 25.335 6 30.071 c 0 4.736 1.844 9.188 5.192 12.536 L 45 76.414 l 33.808 -33.808 c 6.912 -6.912 6.912 -18.159 0 -25.071 c -6.913 -6.912 -18.16 -6.91 -25.071 0 L 45 26.272 l -8.736 -8.737 C 32.808 14.08 28.268 12.352 23.728 12.352 z"
                style={{
                  stroke: '#fff',
                  strokeWidth: 1,
                  strokeDasharray: 'none',
                  strokeLinecap: 'butt',
                  strokeLinejoin: 'miter',
                  strokeMiterlimit: 10,
                  fill: '#fff',
                  fillRule: 'nonzero',
                  opacity: 1,
                }}
                transform="matrix(1 0 0 1 0 0)"
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}
      </span>
    </div>
  );
}
