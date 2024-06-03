// import sql from "mssql";
// const config = {
//   server: "LAPTOP-AJ8E3MA0\\SQLEXPRESS",
//   port: 1433,
//   database: "attensam_test_DB",
//   driver: "SQL Server",
//   connectionTimeout: 100000,
//   options: {
//     trustedConnection: true,
//     trustServerCertificate: true,
//   },
// };

// const conString =
//   "Data Source=LAPTOP-AJ8E3MA0\\SQLEXPRESS;Database=attensam_test_DB;Trusted_Connection=TrueTrustServerCertificate=True;";

// const connectDB = async () => {
//   try {
//     let pool = await sql.connect(config);
//     const result = await pool
//       .request()
//       .query("SELECT * FROM ATINA_MobileBookings");
//     console.log(result);
//     sql.close();
//   } catch (e) {
//     console.log(e);
//     sql.close();
//   }
// };

// export default async function handler(req, res) {
//   await connectDB();
//   res.status(200).json({ data: "data" });
// }
