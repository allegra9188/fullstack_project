const prisma = require("../../prisma");

async function getStudents({ take, skip }) {
    try{
        const students = await prisma.student.findMany({
            take,
            skip,
        });
        return students;
    }catch (error) {
        console.error(error);
    }
}

module.exports = {
    getStudents,
};