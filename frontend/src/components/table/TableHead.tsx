import { chakra, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";

interface TableHeadProps {
  headerGroups: any;
}

const TableHead: React.FC<TableHeadProps> = ({ headerGroups }) => {
  const UpIcon = chakra(FaSortAmountUpAlt);
  const DownIcon = chakra(FaSortAmountDownAlt);
  return (
    <Thead>
      {headerGroups.map((headerGroup: any) => (
        <Tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
              {column.render("Header")}
              {/* Add a sort direction indicator */}
              <span>
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <DownIcon display="inline-block" ml="8px" />
                  ) : (
                    <UpIcon display="inline-block" ml="8px" />
                  )
                ) : (
                  ""
                )}
              </span>
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
  );
};

export default TableHead;
