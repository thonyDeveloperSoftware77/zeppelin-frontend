import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Image, Chip } from "@heroui/react";
import { BiMenuAltRight } from "react-icons/bi";
import useAssignments from "../../../hooks/useAssigments";

const StudentAssigmentView = () => {
    const { assignments } = useAssignments("student")
    const navigate = useNavigate();
    console.log(assignments)
    const handleNavigation = (qr_code, path) => {
        navigate(`/student/course/${qr_code}/${path}`);
    };

 
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4" >
            {assignments.map((course) => (
                <div  onClick={() => handleNavigation(course.qr_code, "view")}>
                    <Card key={course.id} className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">{course.start_date}</p>
                            <h4 className="font-bold text-large">{course.title}</h4>
                            <Chip color={course.is_verify ? "success" : "warning"} variant="dot">
                                {course.is_verify ? "Verificado" : "En Verificación"}
                            </Chip>
                        </CardHeader>
                        <CardBody className="overflow-visible py-2">
                            <Image
                                alt={`Imagen de ${course.title}`}
                                className="object-cover rounded-xl"
                                src={course.image || "https://heroui.com/images/hero-card-complete.jpeg"} // Imagen de respaldo
                                width={270}
                                height={180}
                            />
                        </CardBody>
                       
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default StudentAssigmentView;
