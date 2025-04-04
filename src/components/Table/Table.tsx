import React, { useCallback, useMemo, useState } from "react";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";
import styled from "../../utils/styled";

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
  theme: Theme;
}

const TableWrapper = styled.div<TableWrapperProps>`
  width: 100%;
  border: 1px solid ${(props) => props.theme.palette.divider};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  overflow: hidden;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableHeadProps {
  color?: TableColor;
  theme: Theme;
}

const TableHead = styled.thead<TableHeadProps>`
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].light};
`;

interface TableBodyProps {
  color?: TableColor;
  theme: Theme;
}

const TableBody = styled.tbody<TableBodyProps>`
  background-color: ${(props) => props.theme.palette.background.paper};
`;

interface TableRowProps {
  selected?: boolean;
  clickable?: boolean;
  color?: TableColor;
  theme: Theme;
}

const TableRow = styled.tr<TableRowProps>`
  &:hover {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].lighter};
  }

  ${(props) =>
    props.selected &&
    `
    background-color: ${props.theme.palette[props.color || "primary"].light};
    &:hover {
      background-color: ${props.theme.palette[props.color || "primary"].light};
    }
  `}

  ${(props) => (props.clickable ? "cursor: pointer;" : "")}
`;

interface TableCellProps {
  align?: "left" | "center" | "right";
  padding?: "none" | "normal" | "checkbox";
  theme: Theme;
}

const TableCell = styled.td<TableCellProps>`
  padding: ${(props) =>
    props.padding === "none"
      ? 0
      : props.padding === "checkbox"
      ? "0 0 0 16px"
      : "16px"};
  text-align: ${(props) => props.align || "left"};
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 0.875rem;
  line-height: 1.5;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
`;

interface TableHeaderCellProps {
  align?: "left" | "center" | "right";
  padding?: "none" | "normal" | "checkbox";
  sortable?: boolean;
  color?: TableColor;
  theme: Theme;
}

const TableHeaderCell = styled.th<TableHeaderCellProps>`
  padding: ${(props) =>
    props.padding === "none"
      ? 0
      : props.padding === "checkbox"
      ? "0 0 0 16px"
      : "16px"};
  text-align: ${(props) => props.align || "left"};
  color: ${(props) => props.theme.palette[props.color || "primary"].main};
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].light};
  cursor: ${(props) => (props.sortable ? "pointer" : "default")};
  user-select: none;

  &:hover {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].main};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

interface TableCheckboxProps {
  color?: TableColor;
  theme: Theme;
  indeterminate?: boolean;
}

const TableCheckbox = styled.input<TableCheckboxProps>`
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
  accent-color: ${(props) =>
    props.theme.palette[props.color || "primary"].main};
`;

interface TableEmptyMessageProps {
  color?: TableColor;
  theme: Theme;
}

const TableEmptyMessage = styled.div<TableEmptyMessageProps>`
  padding: 32px;
  text-align: center;
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 0.875rem;
`;

interface TableLoadingOverlayProps {
  color?: TableColor;
  theme: Theme;
}

const TableLoadingOverlay = styled.div<TableLoadingOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.background.paper};
  opacity: 0.7;
  z-index: 1;
`;

interface TablePaginationProps {
  color?: TableColor;
  theme: Theme;
}

const TablePagination = styled.div<TablePaginationProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid ${(props) => props.theme.palette.divider};
  background-color: ${(props) => props.theme.palette.background.paper};
`;

interface TablePaginationSelectProps {
  color?: TableColor;
  theme: Theme;
}

const TablePaginationSelect = styled.select<TablePaginationSelectProps>`
  padding: 4px 8px;
  margin: 0 8px;
  border: 1px solid ${(props) => props.theme.palette.divider};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) => props.theme.palette.background.paper};
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.theme.palette[props.color || "primary"].main};
  }
`;

interface TablePaginationButtonProps {
  color?: TableColor;
  disabled?: boolean;
  theme: Theme;
}

const TablePaginationButton = styled.button<TablePaginationButtonProps>`
  padding: 4px 8px;
  margin: 0 4px;
  border: 1px solid ${(props) => props.theme.palette.divider};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) => props.theme.palette.background.paper};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.theme.palette.text.primary};
  font-size: 0.875rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover:not(:disabled) {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].light};
    border-color: ${(props) =>
      props.theme.palette[props.color || "primary"].main};
    color: ${(props) => props.theme.palette[props.color || "primary"].main};
  }
`;

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
