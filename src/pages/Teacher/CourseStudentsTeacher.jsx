import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import useCourses from "../../hooks/useCourses";
import QRCode from "react-qr-code";
import PageHeader from "../../components/ui/PageHeader";
import Section from "../../components/ui/Section";
import { Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Pagination, Tab, Tabs, User } from "@heroui/react";
import useAssignments from "../../hooks/useAssigments";
import { BiMenuAltRight } from "react-icons/bi";
import CustomTable from "../../components/ui/CustomTable";


const columns = [
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email" },
  { name: "ACTIONS", uid: "actions" },
];



const CourseStudentTeacher = () => {
  const { courses } = useCourses();
  const { qr_code } = useParams();
  const course = courses.find((course) => course.qr_code === qr_code);
  const { assignments } = useAssignments("teacher", course.id)
  console.log(assignments)

  if (!course) {
    return <p className="text-center text-red-500 font-bold">Curso no encontrado</p>;
  }

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm" }}
            description={user.email}
            name={user.name + " " + user.lastname}
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
        total={Math.ceil(assignments.length / 5)}
        onChange={(page) => console.log(page)}
      />
    </div>
  );

  return (
    <div>
      <PageHeader title="Curso>Estudiantes" onBack={true} />
      <Section>
        <h2 className="text-xl font-bold mb-4">{course.title}</h2>
        <Tabs aria-label="Disabled Options" disabledKeys={["music"]}>
          <Tab key="verify" title="Verificado">
            <Card>
              <CardBody>
                <CustomTable
                  columns={columns}
                  data={assignments}
                  renderCell={renderCell}
                  bottomContent={bottomContent}
                  sortDescriptor={sortDescriptor}
                  onSortChange={setSortDescriptor}
                  searchEnabled={true}
                  searchColumns={["Name", "Email"]}

                />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="verifying" title="Por verificar">
            <Card>
              <CardBody>

              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </Section>
    </div>
  );
};

export default CourseStudentTeacher;