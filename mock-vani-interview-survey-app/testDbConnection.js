const sql = require("mssql"); // Import the mssql library
const dbConfig = require("./db/config"); // Import your database configuration

// Function to test the database connection
async function testDbConnection() {
  try {
    const pool = await sql.connect(dbConfig); // Connect to the database
    console.log("Database connection successful");
    pool.close(); // Close the connection after the test
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
}

// Run the connection test
testDbConnection();
