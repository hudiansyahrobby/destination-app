import { Table, Box, Input, Button, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

function GlobalFilter({ globalFilter, setGlobalFilter }: any) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Box as="div" mt="120px">
      Search:{" "}
      <Input
        mt="10px"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search...`}
      />
    </Box>
  );
}

const TableItem = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns: Array<any> = React.useMemo(
    () => [
      {
        Header: "Column 1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column 2",
        accessor: "col2",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    state,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <Box mx="50px">
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table {...getTableProps()} mt="20px" variant="simple">
        <TableHead headerGroups={headerGroups} />
        <TableBody
          page={page}
          getTableBodyProps={getTableBodyProps}
          prepareRow={prepareRow}
        />
      </Table>
      <Box>
        <IconButton
          aria-label="Go To Page 1"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <BsChevronDoubleLeft />
        </IconButton>{" "}
        <IconButton
          aria-label="Go to previous page"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <BsChevronLeft />
        </IconButton>{" "}
        <IconButton
          aria-label="Go to next page"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <BsChevronRight />
        </IconButton>{" "}
        <IconButton
          aria-label="Go to last page"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <BsChevronDoubleRight />
        </IconButton>{" "}
        <Box as="span">
          Page{" "}
          <Box as="strong">
            {pageIndex + 1} of {pageOptions.length}
          </Box>{" "}
        </Box>
        <Box as="span">
          | Go to page:{" "}
          <Input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </Box>{" "}
      </Box>
    </Box>
  );
};

export default TableItem;
