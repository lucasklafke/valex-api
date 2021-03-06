import connection  from "../config/db.js";

export interface Employee {
  id: number;
  fullName: string;
  cpf: string;
  email: string;
  companyId: number;
}

export async function findById(id: number) {
  const result = await connection.query<Employee, [number]>(
    "SELECT * FROM employees WHERE id=$1",
    [id]
  );
  if(result.rowCount === 0 ){
    throw {code: 404, message: "employee not found"}
  }
  return result.rows[0];
}
