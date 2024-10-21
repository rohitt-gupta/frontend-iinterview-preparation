import { validationResult } from "express-validator";
import db from "../config/dbConnection.js";

const register = async (req, res) => {
	const { name, email } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	try {
		// check if the user is present or not
		const [results] = await db
			.promise()
			.query("SELECT * FROM users WHERE email = ?", [email]);

		// if present then return error
		if (results && results.length > 0) {
			console.log("results", results);
			return res.status(400).json({ message: "Email already exists" });
		} else {
			// otherwise insert it.
			await db
				.promise()
				.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);

			res.status(200).json({ message: "User registered successfully" });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

const getUsers = (req, res) => {
	db.query("SELECT * FROM users", (err, results) => {
		if (err) {
			return res.status(500).json({ message: "Database error" });
		}
		res.status(200).json({ users: results });
	});
};

const getUserById = (req, res) => {
	const { id } = req.params;
	db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
		if (err) {
			return res.status(500).json({ message: "Database error" });
		}
		res.status(200).json({ user: results });
	});
};

const updateUser = (req, res) => {
	const { id } = req.params;
	const { name, email } = req.body;
	db.query(
		`UPDATE users SET name = COALESCE(? name), email = COALESCE(? email) WHERE id = ?`,
		[name, email, id],
		(err, results) => {
			if (err) {
				return res.status(500).json({ message: "Database error" });
			}
			res.status(200).json({ message: "User updated successfully" });
		}
	);
};

export { register, getUsers, getUserById, updateUser };
