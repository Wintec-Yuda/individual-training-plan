export default class DataService {
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
}
