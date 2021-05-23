import { Tbody, Td, Tr } from "@chakra-ui/react";
import React from "react";

interface TableBodyProps {
  page: any;
  getTableBodyProps: any;
  prepareRow: any;
}

const TableBody: React.FC<TableBodyProps> = ({
  page,
  getTableBodyProps,
  prepareRow,
}) => {
  return (
    <Tbody {...getTableBodyProps()}>
      {page?.map((row: any, i: number) => {
        prepareRow(row);
        return (
          <Tr {...row.getRowProps()}>
            {row?.cells?.map((cell: any) => {
              return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
            })}
          </Tr>
        );
      })}
    </Tbody>
  );
};

export default TableBody;
