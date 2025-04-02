import React, { useCallback, useMemo, useState } from "react";
import { styled } from "../../utils/styled";
import { useTheme } from "../../theme";

export type TableColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export type SortDirection = "asc" | "desc" | false;

export interface TableColumn<T> {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
  width?: number | string;
  padding?: "none" | "normal" | "checkbox";
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  color?: TableColor;
  selectable?: boolean;
  pagination?: {
    page: number;
    rowsPerPage: number;
    totalRows: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rowsPerPage: number) => void;
  };
  sorting?: {
    sortBy: string | null;
    sortDirection: SortDirection;
    onSortChange: (columnId: string) => void;
  };
  selection?: {
    selectedRows: T[];
    onSelectionChange: (selectedRows: T[]) => void;
  };
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

interface TableWrapperProps {
  color?: TableColor;
  theme: any;
}

interface TableHeadProps {
  color?: TableColor;
  theme: any;
}

interface TableBodyProps {
  color?: TableColor;
  theme: any;
}

interface TableRowProps {
  selected?: boolean;
  clickable?: boolean;
  color?: TableColor;
  theme: any;
}

interface TableCellProps {
  align?: "left" | "center" | "right";
  padding?: "none" | "normal" | "checkbox";
  theme: any;
}

interface TableHeaderCellProps {
  align?: "left" | "center" | "right";
  padding?: "none" | "normal" | "checkbox";
  sortable?: boolean;
  color?: TableColor;
  theme: any;
}

interface TableCheckboxProps {
  color?: TableColor;
  theme: any;
  indeterminate?: boolean;
}

interface TableEmptyMessageProps {
  color?: TableColor;
  theme: any;
}

interface TableLoadingOverlayProps {
  color?: TableColor;
  theme: any;
}

interface TablePaginationProps {
  color?: TableColor;
  theme: any;
}

interface TablePaginationSelectProps {
  color?: TableColor;
  theme: any;
}

interface TablePaginationButtonProps {
  color?: TableColor;
  disabled?: boolean;
  theme: any;
}

const TableWrapper = styled<"div", TableWrapperProps>(
  "div",
  ({ theme }) => `
    width: 100%;
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.shape.borderRadius}px;
    overflow: hidden;
  `
);

const TableContainer = styled<"div">(
  "div",
  () => `
    width: 100%;
    overflow-x: auto;
  `
);

const StyledTable = styled<"table">(
  "table",
  () => `
    width: 100%;
    border-collapse: collapse;
  `
);

const TableHead = styled<"thead", TableHeadProps>(
  "thead",
  ({ color = "primary", theme }) => `
    background-color: ${theme.palette[color].light};
  `
);

const TableBody = styled<"tbody", TableBodyProps>(
  "tbody",
  ({ theme }) => `
    background-color: ${theme.palette.background.paper};
  `
);

const TableRow = styled<"tr", TableRowProps>(
  "tr",
  ({ selected, clickable, color = "primary", theme }) => `
    &:hover {
      background-color: ${theme.palette[color].lighter};
    }

    ${
      selected &&
      `
      background-color: ${theme.palette[color].light};
      &:hover {
        background-color: ${theme.palette[color].light};
      }
    `
    }

    ${clickable ? "cursor: pointer;" : ""}
  `
);

const TableCell = styled<"td", TableCellProps>(
  "td",
  ({ align = "left", padding = "normal", theme }) => `
    padding: ${
      padding === "none" ? 0 : padding === "checkbox" ? "0 0 0 16px" : "16px"
    };
    text-align: ${align};
    color: ${theme.palette.text.primary};
    font-size: 0.875rem;
    line-height: 1.5;
    border-bottom: 1px solid ${theme.palette.divider};
  `
);

const TableHeaderCell = styled<"th", TableHeaderCellProps>(
  "th",
  ({
    align = "left",
    padding = "normal",
    sortable,
    color = "primary",
    theme,
  }) => `
    padding: ${
      padding === "none" ? 0 : padding === "checkbox" ? "0 0 0 16px" : "16px"
    };
    text-align: ${align};
    color: ${theme.palette[color].main};
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.5;
    border-bottom: 1px solid ${theme.palette.divider};
    background-color: ${theme.palette[color].light};
    cursor: ${sortable ? "pointer" : "default"};
    user-select: none;

    &:hover {
      background-color: ${theme.palette[color].main};
      color: ${theme.palette.common.white};
    }
  `
);

const TableCheckbox = styled<"input", TableCheckboxProps>(
  "input",
  ({ color = "primary", theme }) => `
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
    accent-color: ${theme.palette[color].main};
  `
);

const TableEmptyMessage = styled<"div", TableEmptyMessageProps>(
  "div",
  ({ theme }) => `
    padding: 32px;
    text-align: center;
    color: ${theme.palette.text.secondary};
    font-size: 0.875rem;
  `
);

const TableLoadingOverlay = styled<"div", TableLoadingOverlayProps>(
  "div",
  ({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.background.paper};
    opacity: 0.7;
    z-index: 1;
  `
);

const TablePagination = styled<"div", TablePaginationProps>(
  "div",
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 16px;
    border-top: 1px solid ${theme.palette.divider};
    background-color: ${theme.palette.background.paper};
  `
);

const TablePaginationSelect = styled<"select", TablePaginationSelectProps>(
  "select",
  ({ color = "primary", theme }) => `
    padding: 4px 8px;
    margin: 0 8px;
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.primary};
    font-size: 0.875rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${theme.palette[color].main};
    }
  `
);

const TablePaginationButton = styled<"button", TablePaginationButtonProps>(
  "button",
  ({ color = "primary", disabled, theme }) => `
    padding: 4px 8px;
    margin: 0 4px;
    border: 1px solid ${theme.palette.divider};
    border-radius: ${theme.shape.borderRadius}px;
    background-color: ${theme.palette.background.paper};
    color: ${
      disabled ? theme.palette.action.disabled : theme.palette.text.primary
    };
    font-size: 0.875rem;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    opacity: ${disabled ? 0.5 : 1};

    &:hover:not(:disabled) {
      background-color: ${theme.palette[color].light};
      border-color: ${theme.palette[color].main};
      color: ${theme.palette[color].main};
    }
  `
);

export const TableComponent = <T extends { id: string; [key: string]: any }>({
  columns,
  data,
  color = "primary",
  selectable = false,
  pagination,
  sorting,
  selection,
  onRowClick,
  emptyMessage = "No data available",
  loading = false,
}: TableProps<T>) => {
  const theme = useTheme();
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(false);

  const handleSelectAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelectedRows(data);
      } else {
        setSelectedRows([]);
      }
      selection?.onSelectionChange(event.target.checked ? data : []);
    },
    [data, selection]
  );

  const handleSelect = useCallback(
    (row: T, checked: boolean) => {
      const newSelectedRows = checked
        ? [...selectedRows, row]
        : selectedRows.filter((selectedRow) => selectedRow.id !== row.id);
      setSelectedRows(newSelectedRows);
      selection?.onSelectionChange(newSelectedRows);
    },
    [selectedRows, selection]
  );

  const handleSort = useCallback(
    (columnId: string) => {
      if (sorting) {
        sorting.onSortChange(columnId);
      } else {
        if (sortBy === columnId) {
          setSortDirection(
            sortDirection === "asc"
              ? "desc"
              : sortDirection === "desc"
              ? false
              : "asc"
          );
        } else {
          setSortBy(columnId);
          setSortDirection("asc");
        }
      }
    },
    [sortBy, sortDirection, sorting]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!pagination) return;
      pagination.onPageChange(newPage);
    },
    [pagination]
  );

  const handleRowsPerPageChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      if (!pagination) return;
      pagination.onRowsPerPageChange(Number(event.target.value));
    },
    [pagination]
  );

  const isAllSelected = useMemo(() => {
    if (!selection || data.length === 0) return false;
    return selection.selectedRows.length === data.length;
  }, [data.length, selection]);

  const isIndeterminate = useMemo(() => {
    if (!selection || data.length === 0) return false;
    return (
      selection.selectedRows.length > 0 &&
      selection.selectedRows.length < data.length
    );
  }, [data.length, selection]);

  return (
    <TableWrapper color={color} theme={theme}>
      <TableContainer>
        <StyledTable>
          <TableHead color={color} theme={theme}>
            <TableRow color={color} theme={theme}>
              {selectable && (
                <TableHeaderCell padding="checkbox" theme={theme}>
                  <TableCheckbox
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    onChange={handleSelectAll}
                    color={color}
                    theme={theme}
                  />
                </TableHeaderCell>
              )}
              {columns.map((column) => (
                <TableHeaderCell
                  key={column.id}
                  align={column.align}
                  padding={column.padding}
                  sortable={column.sortable}
                  color={color}
                  theme={theme}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  {column.label}
                  {sorting?.sortBy === column.id && (
                    <span>{sorting.sortDirection === "asc" ? " ↑" : " ↓"}</span>
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody color={color} theme={theme}>
            {data.length === 0 ? (
              <TableRow color={color} theme={theme}>
                <TableCell
                  colSpan={selectable ? columns.length + 1 : columns.length}
                  align="center"
                  theme={theme}
                >
                  <TableEmptyMessage color={color} theme={theme}>
                    {emptyMessage}
                  </TableEmptyMessage>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow
                  key={row.id}
                  selected={selectedRows.includes(row)}
                  clickable={!!onRowClick}
                  color={color}
                  theme={theme}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <TableCell padding="checkbox" theme={theme}>
                      <TableCheckbox
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={(e) => handleSelect(row, e.target.checked)}
                        color={color}
                        theme={theme}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      padding={column.padding}
                      theme={theme}
                    >
                      {column.render ? column.render(row) : row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </StyledTable>
      </TableContainer>
      {loading && (
        <TableLoadingOverlay color={color} theme={theme}>
          Loading...
        </TableLoadingOverlay>
      )}
      {pagination && (
        <TablePagination color={color} theme={theme}>
          <span>
            {pagination.page * pagination.rowsPerPage + 1}-
            {Math.min(
              (pagination.page + 1) * pagination.rowsPerPage,
              pagination.totalRows
            )}{" "}
            of {pagination.totalRows}
          </span>
          <TablePaginationSelect
            value={pagination.rowsPerPage}
            onChange={(e) =>
              pagination.onRowsPerPageChange(Number(e.target.value))
            }
            color={color}
            theme={theme}
          >
            {[5, 10, 25, 50].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </TablePaginationSelect>
          <TablePaginationButton
            onClick={() => pagination.onPageChange(pagination.page - 1)}
            disabled={pagination.page === 0}
            color={color}
            theme={theme}
          >
            Previous
          </TablePaginationButton>
          <TablePaginationButton
            onClick={() => pagination.onPageChange(pagination.page + 1)}
            disabled={
              (pagination.page + 1) * pagination.rowsPerPage >=
              pagination.totalRows
            }
            color={color}
            theme={theme}
          >
            Next
          </TablePaginationButton>
        </TablePagination>
      )}
    </TableWrapper>
  );
};

export const Table = {
  Root: TableComponent,
};
