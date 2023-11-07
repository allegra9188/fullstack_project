const prisma = require("../prisma");

/** Seeds the database with a user and some tasks */
const seed = async () => {
  const firstNames = [
    "John",
    "Jane",
    "Mary",
    "James",
    "Emma",
    "Jacob",
    "Olivia",
    "Max",
    "Sophia",
    "Ethan",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Wilson",
  ];
  for (let i = 0; i < 100; i++) {
    const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length); // Generate a random index for first names
    const randomLastNameIndex = Math.floor(Math.random() * lastNames.length); // Generate a random index for last names

    const firstName = firstNames[randomFirstNameIndex]; // Get a random first name
    const lastName = lastNames[randomLastNameIndex]; // Get a random last name
    const gpa = (Math.random() * 4).toFixed(2);
    await prisma.student.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}.@students.com`,
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

  module.exports = seed;