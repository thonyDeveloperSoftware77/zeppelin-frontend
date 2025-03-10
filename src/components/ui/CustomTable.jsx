import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
} from "@heroui/react";
import { BiSearch } from "react-icons/bi";

const CustomTable = ({
  columns,
  data,
  renderCell,
  topContent,
  bottomContent,
  sortDescriptor,
  onSortChange,
  searchEnabled = false,
  searchColumns = [],
}) => {
  const [filterValue, setFilterValue] = useState("");

  const filteredData = useMemo(() => {
    if (!searchEnabled || !filterValue) return data;
    return data.filter((item) =>
      searchColumns.some((col) => {
        const value = item[col];
        return (
          value &&
          value
            .toString()
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        );
      })
    );
  }, [data, filterValue, searchColumns, searchEnabled]);

  const mergedTopContent = useMemo(() => {
    const searchUI = searchEnabled && (
      <div style={{marginTop:"20px"}} className="flex mb-4">

        <Input
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar..."
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          startContent={<BiSearch />}
        />
      </div>
    );
    return (
      <div>
        {searchUI}
        {topContent}
      </div>
    );
  }, [searchEnabled, filterValue, topContent]);

  return (
    <Table
      style={{marginTop:"10px"}}
      isCompact
      removeWrapper
      aria-label="Reusable table"
      topContent={mergedTopContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No data found"} items={filteredData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
