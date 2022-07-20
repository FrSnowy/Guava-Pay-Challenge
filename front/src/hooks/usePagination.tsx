import * as React from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';
import useSessionStoredState from './useSessionStoredState';

type UsePaginationT = {
  initialPage: number,
  paramName: string,
  totalPages: number,
}

const usePagination = ({ initialPage, paramName, totalPages }: UsePaginationT) => {
  const [currentPage, setCurrentPage] = useSessionStoredState<number>(initialPage, paramName);

  const onPageChangeHandler = React.useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, p: PaginationProps) => {
    const pageNum = parseInt(`${p.activePage || 1}`, 10);
    setCurrentPage(pageNum);
    window.scrollTo(0, 0);
  }, []);
  
  const view = React.useMemo(() => {
    if (totalPages < 2) return null;

    return (
      <Pagination
        defaultActivePage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChangeHandler}
        prevItem={false}
        nextItem={false}
        lastItem={false}
        firstItem={false}
      />
    )
}, [currentPage, totalPages, onPageChangeHandler]);

  return { view, currentPage, setCurrentPage }
}

export default usePagination;