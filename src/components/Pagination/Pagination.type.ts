export interface PaginationProps {
  className?: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (pageNumber: number) => void;
  siblingCount?: number;
}

export type PageType = 'prev' | 'next';

export interface PaginationControlButtonProps {
  title: string;
  type: PageType;
  disabled?: boolean;
  onClick: () => void;
}

export interface PaginationPageLinkProps {
  pageNumber: number;
  active: boolean;
  onClick: () => void;
}
