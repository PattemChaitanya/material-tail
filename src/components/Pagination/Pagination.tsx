import React, { useCallback, useMemo } from "react";
import { styled } from "../../utils/styled";
import { useTheme } from "../../theme";

export type PaginationColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type PaginationVariant = "text" | "outlined" | "contained";

export interface PaginationProps {
  page: number;
  count: number;
  rowsPerPage: number;
  rowsPerPageOptions?: number[];
  color?: PaginationColor;
  variant?: PaginationVariant;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  disabled?: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}

const PaginationWrapper = styled.div<{
  color?: PaginationColor;
  theme: any;
}>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const PaginationSelect = styled.select<{
  color?: PaginationColor;
  theme: any;
}>`
  padding: 4px 8px;
  margin: 0 8px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ color = "primary", theme }) =>
      theme.palette[color].main};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationButton = styled.button<{
  color?: PaginationColor;
  variant?: PaginationVariant;
  disabled?: boolean;
  theme: any;
}>`
  padding: 4px 8px;
  margin: 0 4px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ variant = "text", color = "primary", theme }) =>
    variant === "contained"
      ? theme.palette[color].main
      : theme.palette.background.paper};
  color: ${({ variant = "text", color = "primary", disabled, theme }) =>
    disabled
      ? theme.palette.action.disabled
      : variant === "contained"
      ? theme.palette.common.white
      : theme.palette[color].main};
  font-size: 0.875rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${({ variant = "text", color = "primary", theme }) =>
      variant === "contained"
        ? theme.palette[color].dark
        : theme.palette[color].light};
    border-color: ${({ variant = "text", color = "primary", theme }) =>
      variant === "contained"
        ? theme.palette[color].dark
        : theme.palette[color].main};
    color: ${({ variant = "text", color = "primary", theme }) =>
      variant === "contained"
        ? theme.palette.common.white
        : theme.palette[color].main};
  }
`;

const PaginationInfo = styled.span<{
  color?: PaginationColor;
  theme: any;
}>`
  margin: 0 16px;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
`;

export const PaginationComponent = ({
  page,
  count,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25, 50],
  color = "primary",
  variant = "text",
  showFirstButton = true,
  showLastButton = true,
  disabled = false,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) => {
  const theme = useTheme();

  const handleFirstPage = useCallback(() => {
    onPageChange(0);
  }, [onPageChange]);

  const handleLastPage = useCallback(() => {
    onPageChange(Math.ceil(count / rowsPerPage) - 1);
  }, [count, rowsPerPage, onPageChange]);

  const handlePreviousPage = useCallback(() => {
    onPageChange(page - 1);
  }, [page, onPageChange]);

  const handleNextPage = useCallback(() => {
    onPageChange(page + 1);
  }, [page, onPageChange]);

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onRowsPerPageChange?.(Number(event.target.value));
    },
    [onRowsPerPageChange]
  );

  const isFirstPage = page === 0;
  const isLastPage = page >= Math.ceil(count / rowsPerPage) - 1;

  const pageRange = useMemo(() => {
    const totalPages = Math.ceil(count / rowsPerPage);
    const range = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(0, page - halfMaxVisiblePages);
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    return range;
  }, [count, rowsPerPage, page]);

  return (
    <PaginationWrapper color={color} theme={theme}>
      <span>
        Rows per page:
        <PaginationSelect
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          disabled={disabled}
          color={color}
          theme={theme}
        >
          {rowsPerPageOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </PaginationSelect>
      </span>
      <PaginationInfo color={color} theme={theme}>
        {Math.min(page * rowsPerPage + 1, count)} -{" "}
        {Math.min((page + 1) * rowsPerPage, count)} of {count}
      </PaginationInfo>
      {showFirstButton && (
        <PaginationButton
          onClick={handleFirstPage}
          disabled={disabled || isFirstPage}
          color={color}
          variant={variant}
          theme={theme}
        >
          First
        </PaginationButton>
      )}
      <PaginationButton
        onClick={handlePreviousPage}
        disabled={disabled || isFirstPage}
        color={color}
        variant={variant}
        theme={theme}
      >
        Previous
      </PaginationButton>
      {pageRange.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={disabled}
          color={color}
          variant={pageNumber === page ? "contained" : variant}
          theme={theme}
        >
          {pageNumber + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={handleNextPage}
        disabled={disabled || isLastPage}
        color={color}
        variant={variant}
        theme={theme}
      >
        Next
      </PaginationButton>
      {showLastButton && (
        <PaginationButton
          onClick={handleLastPage}
          disabled={disabled || isLastPage}
          color={color}
          variant={variant}
          theme={theme}
        >
          Last
        </PaginationButton>
      )}
    </PaginationWrapper>
  );
};

export const Pagination = {
  Root: PaginationComponent,
};
