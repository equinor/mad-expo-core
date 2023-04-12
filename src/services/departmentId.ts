let departmentId: string = "0";

export const getDepartmentId = () => departmentId;
export const setDepartmentId = (newDepartmentId: string) => {
  departmentId = newDepartmentId;
}
