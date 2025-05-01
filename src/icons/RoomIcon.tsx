function RoomIcon() {
  return (
    <svg
      className='size-[1.2em]'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      <g fill='currentColor' strokeLinejoin='miter' strokeLinecap='butt'>
        <polyline
          points='3 14 9 14 9 17 15 17 15 14 21 14'
          fill='none'
          stroke='currentColor'
          stroke-miterlimit='10'
          strokeWidth='2'
        ></polyline>
        <rect
          x='3'
          y='3'
          width='18'
          height='18'
          rx='2'
          ry='2'
          fill='none'
          stroke='currentColor'
          strokeLinecap='square'
          stroke-miterlimit='10'
          strokeWidth='2'
        ></rect>
      </g>
    </svg>
  );
}

export default RoomIcon;
