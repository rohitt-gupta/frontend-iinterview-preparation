import mysql from "mysql2";

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "ums_node",
});

// Connect to MySQL
db.connect((err) => {
	if (err) {
		console.error("Error connecting to MySQL: " + err.stack);
		return;
	}
	console.log("Connected to MySQL as ID " + db.threadId);
});

export default db;
