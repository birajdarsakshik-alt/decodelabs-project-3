const db = require("../../database/database");

// GET all students
const getStudents = (req, res) => {
  const sql = "SELECT * FROM students ORDER BY id ASC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch students",
        error: err.message
      });
    }

    const students = rows.map((student) => ({
      ...student,
      skills: JSON.parse(student.skills)
    }));

    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  });
};

// GET student by ID
const getStudentById = (req, res) => {
  const id = Number(req.params.id);

  db.get(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (err, student) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch student",
          error: err.message
        });
      }

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      student.skills = JSON.parse(student.skills);

      res.status(200).json({
        success: true,
        data: student
      });
    }
  );
};

// CREATE student
const createStudent = (req, res) => {
  const { name, email, course, year, skills } = req.body;

  const sql = `
    INSERT INTO students (name, email, course, year, skills)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [name, email, course, year, JSON.stringify(skills)],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(409).json({
            success: false,
            message: "Email already exists"
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to create student",
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: {
          id: this.lastID,
          name,
          email,
          course,
          year,
          skills
        }
      });
    }
  );
};

// UPDATE student
const updateStudent = (req, res) => {
  const id = Number(req.params.id);
  const { name, email, course, year, skills } = req.body;

  db.get(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (err, existingStudent) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to find student",
          error: err.message
        });
      }

      if (!existingStudent) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      const updatedName = name ?? existingStudent.name;
      const updatedEmail = email ?? existingStudent.email;
      const updatedCourse = course ?? existingStudent.course;
      const updatedYear = year ?? existingStudent.year;
      const updatedSkills =
        skills ?? JSON.parse(existingStudent.skills);

      const sql = `
        UPDATE students
        SET name = ?, email = ?, course = ?, year = ?, skills = ?
        WHERE id = ?
      `;

      db.run(
        sql,
        [
          updatedName,
          updatedEmail,
          updatedCourse,
          updatedYear,
          JSON.stringify(updatedSkills),
          id
        ],
        (updateErr) => {
          if (updateErr) {
            if (updateErr.message.includes("UNIQUE")) {
              return res.status(409).json({
                success: false,
                message: "Email already exists"
              });
            }

            return res.status(500).json({
              success: false,
              message: "Failed to update student",
              error: updateErr.message
            });
          }

          res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: {
              id,
              name: updatedName,
              email: updatedEmail,
              course: updatedCourse,
              year: updatedYear,
              skills: updatedSkills
            }
          });
        }
      );
    }
  );
};

// DELETE student
const deleteStudent = (req, res) => {
  const id = Number(req.params.id);

  db.run(
    "DELETE FROM students WHERE id = ?",
    [id],
    function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to delete student",
          error: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "Student deleted successfully"
      });
    }
  );
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
