const { ServerError } = require("../../errors");
const prisma = require("../../prisma");
const router = require("express").Router();

/** retrieves all students */
router.get("/", async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (err) {
    next(err);
  }
});

/** Creates new student */
router.post("/", async (req, res, next) => {
  try {
    const newStudent = await prisma.student.create({
      data: req.body,
    });
    res.json(newStudent);
  } catch (err) {
    next(err);
  }
});

/** retrieves single student by id */
// DONE? TO-Do - Double Check
router.get("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const student = await prisma.student.findUnique({ where: { id } });
    if (!student) {
      return next({
        status: 404,
        message: `Could not find student with id ${id}.`,
      });
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
});

/** Updates single student by id */
router.put("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;

    const student = await prisma.task.findUnique({ where: { id } });

    const updatedStudent = await prisma.task.update({
      where: { id },
      // TODO (below)
      data: {},
    });
    res.json(updatedStudent);
  } catch (err) {
    next(err);
  }
});

/** Deletes single student by id */
// DONE? TO-Do - Double Check
router.delete("/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    await prisma.student.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
