const express = require("express");
const router = express.Router();

const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/userController");

const validateStudent = require("../middleware/validation");

// GET all students
router.get("/", getStudents);

// GET student by ID
router.get("/:id", getStudentById);

// CREATE student
router.post("/", validateStudent, createStudent);

// UPDATE student
router.put("/:id", updateStudent);

// DELETE student
router.delete("/:id", deleteStudent);

module.exports = router;
