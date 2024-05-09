export default class DataService {
  async getData(): Promise<any[]> {
    try {
      const response = await fetch("employee.json");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: any[] = await response.json();

      return jsonData;
    } catch (error) {
      throw error;
    }
  }
  async getDataUser(nik: string = "000500022"): Promise<any[]> {
    try {
      const response = await fetch("employee.json");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: any[] = await response.json();

      const user = jsonData.filter((employee: any) => employee.nik === nik);
      return user[0];
    } catch (error) {
      throw error;
    }
  }
  async getDataTeam(): Promise<any[]> {
    try {
      const response = await fetch("employee.json");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: any[] = await response.json();

      const team = jsonData.filter((employee: any) => employee.superiorNIK === "000500022");
      return team;
    } catch (error) {
      throw error;
    }
  }
  async getDataCourse(): Promise<any[]> {
    try {
      const response = await fetch("course.json");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData: any[] = await response.json();

      return jsonData;
    } catch (error) {
      throw error;
    }
  }

  async addCoursesToEmployee(nik: string, courses: string[]): Promise<any[]> {
    try {
      const response = await fetch("employee.json");

      if (!response.ok) {
        throw new Error("Failed to fetch employee data");
      }

      let jsonData: any[] = await response.json();

      const employeeIndex = jsonData.findIndex((employee: any) => employee.nik === nik);

      if (employeeIndex === -1) {
        throw new Error("Employee not found");
      }

      jsonData[employeeIndex].courses = courses;

      return jsonData;
    } catch (error) {
      throw error;
    }
  }
}
