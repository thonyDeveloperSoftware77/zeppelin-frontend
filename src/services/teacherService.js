import dataService from "./dataService";

export async function registerTeacher(teacherData) {
    const payload = {
        name: teacherData.name,
        lastname: teacherData.lastname,
        email: teacherData.email
    }
  return await dataService.post("/teacher/register", payload);
}

export async function getTeachers() {
  return await dataService.get("/teachers");
}
