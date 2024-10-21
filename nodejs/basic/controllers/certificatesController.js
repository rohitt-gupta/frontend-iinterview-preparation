import { validationResult } from "express-validator";
import db from "../config/dbConnection.js";
import { query } from "express";

const createCertificate = async (req, res) => {
	const {
		certificate_code,
		certificate_name,
		issuer,
		overview,
		start_date,
		duration,
		status,
	} = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const end_date = new Date(start_date);
	end_date.setMonth(end_date.getMonth() + duration);
	console.log("end_date", end_date);

	try {
		const [result] = await db
			.promise()
			.query(
				"INSERT INTO certificates (certificate_code, certificate_name, issuer, overview, start_date, duration, status, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
				[
					certificate_code,
					certificate_name,
					issuer,
					overview,
					start_date,
					duration,
					status,
					end_date,
				]
			);

		if (result.affectedRows === 1) {
			res.status(201).json({
				message: "Certificate created successfully",
				id: result.insertId,
			});
		} else {
			res.status(400).json({ message: "Failed to create certificate" });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

const editCertificate = async (req, res) => {
	const id = req.params.id;
	const {
		certificate_code,
		certificate_name,
		issuer,
		overview,
		start_date,
		duration,
		status,
	} = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	if (!id) {
		return res.status(400).json({ message: "Certificate ID is required" });
	}

	// if (status === "PUBLISHED") {
	// 	return res
	// 		.status(405)
	// 		.json({ message: "Cannot Modify published certificate!" });
	// }

	try {
		const [result] = await db.promise().query(
			`UPDATE certificates
        SET
        certificate_name = COALESCE(?, certificate_name),
        issuer = COALESCE(? ,issuer),
        overview = COALESCE(? ,overview),
        duration = COALESCE(? ,duration),
        status = COALESCE(? ,status)
        WHERE id = ?`,
			[certificate_name, issuer, overview, duration, status, id]
		);

		if (result.affectedRows === 1) {
			res.status(201).json({
				message: "Certificate updated successfully",
			});
		} else {
			res.status(400).json({ message: "Failed to update certificate" });
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Server error" });
	}
};

//FIXME: fix the start_date and end_date filter
const getAdminCertificates = async (req, res) => {
	try {
		const { search, status, start_date, end_date, order_by } = req.query;

		let query = "SELECT * FROM certificates WHERE 1=1";
		const queryParams = [];

		if (search) {
			query += " AND certificate_name LIKE ?";
			queryParams.push(`%${search}%`);
		}

		if (status) {
			query += " AND status = ?";
			queryParams.push(status);
		}

		if (start_date && end_date) {
			query += " AND start_date BETWEEN ? AND ?";
			queryParams.push(start_date, end_date);
		} else if (start_date) {
			query += " AND start_date >= ?";
			queryParams.push(start_date);
		} else if (end_date) {
			query += " AND end_date <= ?";
			queryParams.push(end_date);
		}

		switch (order_by) {
			case "certificate_name":
				query += " ORDER BY certificate_name ASC";
				break;
			case "users_enrolled":
				query += " ORDER BY users_enrolled DESC";
				break;
			case "start_date":
				query += " ORDER BY start_date ASC";
				break;
			default:
				query += " ORDER BY created_at DESC";
		}

		// console.log("query", query);
		// console.log("queryParams", queryParams);
		const [certificates] = await db.promise().query(query, queryParams);

		res.status(200).json({
			success: true,
			data: certificates,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error fetching certificates",
			error: error.message,
		});
	}
};

const getUserCertificates = async (req, res) => {
	try {
		const user_id = req.params.user_id;
		const { search, start_date, end_date, order_by } = req.query;

		const [result1] = await db
			.promise()
			.query(`SELECT * FROM users WHERE id = ?`, [user_id]);

		if (result1.length === 0) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const user_email = result1[0].email;

		let query = "SELECT * FROM certificates WHERE 1=1";
		const queryParams = [];
		query += " AND status = ?";
		queryParams.push("PUBLISHED");

		if (search) {
			query += " AND certificate_name LIKE ?";
			queryParams.push(`%${search}%`);
		}

		if (start_date && end_date) {
			query += " AND start_date BETWEEN ? AND ?"; //  => with filters
			queryParams.push(start_date, end_date);
		} else if (start_date) {
			query += " AND start_date >= ?";
			queryParams.push(start_date);
		} else if (end_date) {
			query += " AND end_date <= ?";
			queryParams.push(end_date);
		}

		switch (order_by) {
			case "certificate_name":
				query += " ORDER BY certificate_name ASC";
				break;
			default:
				query += " ORDER BY created_at DESC";
		}

		const [certificates] = await db.promise().query(query, queryParams);

		const certificatesWithEnrollment = await Promise.all(
			certificates.map(async (certificate) => {
				const [result2] = await db
					.promise()
					.query(
						`SELECT * FROM user_certificates WHERE certificate_id = ? AND user_email = ?`,
						[certificate.id, user_email]
					);

				return {
					id: certificate.id,
					certificate_code: certificate.certificate_code,
					certificate_name: certificate.certificate_name,
					issuer: certificate.issuer,
					overview: certificate.overview,
					start_date: certificate.start_date,
					duration: certificate.duration,
					end_date: certificate.end_date,
					is_enrolled: result2.length > 0,
				};
			})
		);

		res.status(200).json({
			success: true,
			data: certificatesWithEnrollment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Error fetching certificates",
			error: error.message,
		});
	}
};

const enrollUser = async (req, res) => {
	try {
		const { certificate_id, user_id } = req.body;

		const [result1] = await db
			.promise()
			.query(`SELECT * FROM users WHERE id = ?`, [user_id]);

		if (result1.length === 0) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}
		const user_email = result1[0].email;

		// increment users_enrolled
		const [result] = await db.promise().query(
			`UPDATE certificates
      SET users_enrolled = COALESCE(users_enrolled + 1, 1)
      WHERE id = ?`,
			[certificate_id]
		);

		// add record in users_certificates
		const [result2] = await db.promise().query(
			`INSERT INTO user_certificates (user_email, certificate_id)
      VALUES (?, ?)`,
			[user_email, certificate_id]
		);

		if (result.affectedRows === 1 && result2.affectedRows === 1) {
			res.status(200).json({
				success: true,
				message: "User enrolled in certificate successfully",
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Failed to enroll user in certificate",
			});
		}
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: "Error enrolling user in certificate",
			error: error.message,
		});
	}
};

export {
	createCertificate,
	editCertificate,
	getAdminCertificates,
	enrollUser,
	getUserCertificates,
};
