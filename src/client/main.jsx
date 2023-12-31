import React from "react";
import ReactDOM from "react-dom/client";

import "./index.less";

import { Provider } from "react-redux";
import store from "./store";

import Root from "./layout/Root.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Students from "./features/students/StudentList";
import StudentDetails from "./features/students/StudentDetails";
import ErrorPage from "./features/students/ErrorPage";
import StudentsByLastName from "./features/students/StudentsByLastName";
import NewStudent from "./features/students/NewStudent";
import StudentsByGpa from "./features/students/StudentsByGpa";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Students /> },
      { path: "/students", element: <Students /> },
      { path: "/students/:id", element: <StudentDetails /> },
      { path: "/students/add", element: <NewStudent /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/students/sortedbygpa", element: <StudentsByGpa /> },
      { path: "/students/sortedbylastname", element: <StudentsByLastName /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
