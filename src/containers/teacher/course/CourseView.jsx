import React, { useState, useCallback } from "react";
import {
  Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Pagination
} from "@heroui/react";
import { BiMenuAltRight } from "react-icons/bi";
import useCourses from "../../../hooks/useCourses";
import CustomTable from "../../../components/ui/CustomTable";

const columns = [
  { name: "TÍTULO", uid: "title", sortable: true },
  { name: "FECHA DE INICIO", uid: "start_date" },
  { name: "ACTIONS", uid: "actions" },
];

const CourseView = () => {
  const { courses } = useCourses();
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });

  const renderCell = useCallback((course, columnKey) => {
    const cellValue = course[columnKey];
    switch (columnKey) {
      case "title":
        return <span className="font-bold">{cellValue}</span>;
      case "actions":
        return (
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <BiMenuAltRight />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="view">Ver</DropdownItem>
                <DropdownItem key="edit">Editar</DropdownItem>
                <DropdownItem key="delete">Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <CustomTable
        columns={columns}
        data={courses}
        renderCell={renderCell}
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        searchEnabled={true}
        searchColumns={["title"]}
      />
    </>
  );
};

export default CourseView;
