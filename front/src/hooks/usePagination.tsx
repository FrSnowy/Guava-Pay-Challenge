import * as React from 'react';
import { Pagination, PaginationProps } from 'semantic-ui-react';

type UsePaginationT = {
  initialPage: number,
  totalPages: number,
}

const usePagination = ({ initialPage, totalPages }: UsePaginationT) => {
  const [currentPage, setCurrentPage] = React.useState<number>(initialPage);

  const onPageChangeHandler = React.useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, p: PaginationProps) => {
    const pageNum = parseInt(`${p.activePage || 1}`, 10);
    setCurrentPage(pageNum);
  }, []);
  
  const view = React.useMemo(() => {
    if (!totalPages) return null;

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

  return { view, currentPage }
}

export default usePagination;