import React from 'react';
import { BsChevronBarLeft, BsChevronBarRight, BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// interface IProp {
//   actualPage: number;
//   setActualPage: React.Dispatch<React.SetStateAction<number>>;
//   totalPages: number;
//   numberPage: number;
// }

const Pagination = ({
  setActualPage,
  actualPage,
  totalPages,
  numberPage,
}) => {
  const handleNextClick = () => {
    if (actualPage < totalPages) {
      setActualPage(actualPage + 1);
    }
  };

  const handleReturnClick = () => {
    if (numberPage > 1) {
      setActualPage(actualPage - 1);
    }
  };

  const handleClickTotalPage = () => {
    setActualPage(totalPages);
  };

  const handleButtonClick = (id) => {
    setActualPage(parseInt(id));
  };

  const handleInitialPageClick = () => {
    setActualPage(1);
  };
  const handlePreviousFive = () => {
    setActualPage(actualPage - 5);
  };

  const handleNextFive = () => {
    setActualPage(actualPage + 5);
  };

  return (
    <div>
      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        color="brand.750"
        disabled={numberPage === 1}
        onClick={handleInitialPageClick}
        transition="1s ease"
        _hover={{ bg: 'brand.800' }}
      >
        <BsChevronBarLeft />
        {/* BsChevronBarLeft
        BsSkipStartFill */}
      </button>
      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        color="brand.750"
        onClick={handlePreviousFive}
        disabled={numberPage <= 5}
        transition="1s ease"
        _hover={{ bg: 'brand.800' }}
      >
        <BsChevronDoubleLeft />
      </button>

      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        color="brand.750"
        onClick={handleReturnClick}
        disabled={numberPage === 1}
        _hover={{ bg: 'brand.800' }}
        transition="1s ease"
      >
        <BsChevronLeft />
      </button>
      {actualPage <= totalPages - 4 || actualPage > 0 ? null : (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          onClick={() => handleButtonClick((actualPage - 4).toString())}
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
        >
          {actualPage - 4}
        </button>
      )}

      {actualPage <= totalPages - 3 || actualPage > 0 ? null : (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          onClick={() => handleButtonClick((actualPage - 3).toString())}
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
        >
          {actualPage - 3}
        </button>
      )}

      {actualPage <= totalPages - 2 || actualPage > 0 ? null : (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          onClick={() => handleButtonClick((actualPage - 2).toString())}
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
        >
          {actualPage - 2}
        </button>
      )}

      {actualPage <= totalPages - 1 || actualPage > 0 ? null : (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          onClick={() => handleButtonClick((actualPage - 1).toString())}
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
        >
          {actualPage - 1}
        </button>
      )}
      <button
        bg="brand.900"
        variant="solid"
        size="sm"
        color="white"
        _hover={{ bg: 'brand.800' }}
        transition="1s ease"
        id={actualPage.toString()}
      >
        {actualPage}
      </button>

      {actualPage <= totalPages - 1 && (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          onClick={() => handleButtonClick((actualPage + 1).toString())}
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
        >
          {actualPage + 1}
        </button>
      )}

      {actualPage <= totalPages - 2 && (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
          onClick={() => handleButtonClick((actualPage + 2).toString())}
        >
          {actualPage + 2}
        </button>
      )}
      {actualPage <= totalPages - 3 && (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          _hover={{ bg: 'brand.800' }}
          transition="1s ease"
          onClick={() => handleButtonClick((actualPage + 3).toString())}
        >
          {actualPage + 3}
        </button>
      )}
      {actualPage <= totalPages - 4 && (
        <button
          colorScheme="teal"
          variant="ghost"
          size="sm"
          color="brand.750"
          _hover={{ bg: 'brand.800' }}
          onClick={() => handleButtonClick((actualPage + 4).toString())}
          transition="1s ease"
        >
          {actualPage + 4}
        </button>
      )}

      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        color="brand.750"
        onClick={handleNextClick}
        _hover={{ bg: 'brand.800' }}
        disabled={numberPage === totalPages}
        transition="1s ease"
      >
        <BsChevronRight />
      </button>

      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        onClick={handleNextFive}
        disabled={numberPage >= totalPages - 5}
        _hover={{ bg: 'brand.800' }}
        transition="1s ease"
        color="brand.750"
      >
        <BsChevronDoubleRight />
      </button>

      <button
        colorScheme="teal"
        variant="ghost"
        size="sm"
        color="brand.750"
        onClick={handleClickTotalPage}
        disabled={numberPage === totalPages}
        _hover={{ bg: 'brand.800' }}
        transition="1s ease"
      >
        <BsChevronBarRight />
      </button>
    </div>
  );
};

export default Pagination;
