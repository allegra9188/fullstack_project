require("dotenv").config();
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const { createServer: createViteServer } = require("vite");
const getStudents = require("./api/students/getStudents");

const PORT = process.env.PORT ?? 3000;

/**
 * The app has to be created in a separate async function
 * since we need to wait for the Vite server to be created
 */
const createApp = async () => {
  const app = express();

  // Logging middleware
  app.use(morgan("dev"));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use("/api", require("./api"));

  // backend for pagination for /api/students
  app.get("/api/students", async (res, req) => {
    try {
      const page = req.query.page || 1;
      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      // data retrieval logical
      const students = await getStudents.getStudents({
        take: pageSize,
        skip,
      });
      res.json(students);
    }catch(error) {
      console.error(error);
      res.status(500).send("Internal Service Error")
    }
  })
  
  // Serve static HTML in production & Vite dev server in development
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../../dist/")));
  } else {
    // Pulled from https://vitejs.dev/config/server-options.html#server-middlewaremode
    const vite = await createViteServer({
      server: { middlewareMode: true },
    });

    app.use(vite.middlewares);
  }

  // Simple error handling middleware
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).send(err.message ?? "Internal server error.");
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
  });
};

createApp();
