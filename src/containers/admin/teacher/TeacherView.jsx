import React, { useState, useCallback } from "react";
import { User, Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem, Pagination } from "@heroui/react";
import { BiMenuAltRight } from "react-icons/bi";
import useTeachers from "../../../hooks/useTeachers";
import CustomTable from "../../../components/ui/CustomTable";

const columns = [
    { name: "NOMBRE", uid: "Name", sortable: true },
    { name: "EMAIL", uid: "Email" },
    { name: "ACTIONS", uid: "actions" },
];



const TeacherView = () => {
    const { teachers} = useTeachers();
   console.log(teachers)
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];
        switch (columnKey) {
            case "Name":
                return (
                    <User
                        avatarProps={{ radius: "full", size: "sm"}}
                        description={user.Email}
                        name={user.Name + " " + user.Lastname}
                    />
                );
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
                                <DropdownItem key="view">View</DropdownItem>
                                <DropdownItem key="edit">Edit</DropdownItem>
                                <DropdownItem key="delete">Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);


    const bottomContent = (
        <div className="mt-4">
            <Pagination
                page={1}
                total={Math.ceil(teachers.length / 5)}
                onChange={(page) =>console.log(page)}
            />
        </div>
    );

    return (
        <>

            <CustomTable
                columns={columns}
                data={teachers}
                renderCell={renderCell}
                bottomContent={bottomContent}
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
                searchEnabled={true}
                searchColumns={["Name", "Email"]}

            />
        </>

    );
};

export default TeacherView;
