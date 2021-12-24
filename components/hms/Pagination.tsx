import { TrackWithPeer } from '@100mslive/react-sdk/dist/utils/layout';
import React from 'react';

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  list: (TrackWithPeer & {
    width: number;
    height: number;
  })[][];
}

const Pagination: React.FC<Props> = ({ list, page, setPage }) => {
  const disableLeft = list.length - page === list.length;
  const disableRight = list.length - page === 1;
  const nextPage = () => {
    // last
    if (page === list.length - 1) {
      setPage(list.length - 1);
    } else {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    // prev
    if (page === 0) {
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };
  return (
    <div
      className={`flex items-center space-x-2 absolute -bottom-16 right-10 z-20 border-solid border-gray-700 border px-1 py-2 rounded-3xl`}
    >
      <button className="arrow-btn" onClick={prevPage} disabled={disableLeft}>
        <ChevronLeft />
      </button>
      {list.map((_, i: number) => (
        <div
          className={`w-[6px] h-[6px] rounded-full cursor-pointer ${
            i === page ? 'bg-gray-200' : 'bg-gray-500'
          }`}
          onClick={() => setPage(i)}
        />
      ))}
      <button className="arrow-btn" onClick={nextPage} disabled={disableRight}>
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

const ChevronLeft = () => (
  <svg
    width={14}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    color="white"
    className="cursor-pointer"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    shapeRendering="geometricPrecision"
    color="white"
    className="cursor-pointer"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);
