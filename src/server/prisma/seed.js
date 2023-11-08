const prisma = require("../prisma");
const { faker } = require('@faker-js/faker');

/** Seeds the database with random names from the faker API */
const seed = async () => {

  for (let i = 0; i < 100; i++) {

    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();
    const gpa = (Math.random() * 4).toFixed(2);

    await prisma.student.create({
      data: {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}@students.com`,
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png",
        gpa: gpa,
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
