// poolTest.js
const pool = require("./config/db");

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ DB connected successfully!");
    connection.release(); // release connection back to pool
    process.exit(0);
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
})();
