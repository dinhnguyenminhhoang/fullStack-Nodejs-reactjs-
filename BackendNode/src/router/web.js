import express from "express";
import HomePage from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();
let initWebRoutes = (app) => {
  router.get("/", HomePage.getHomePage);
  router.get("/crud", HomePage.getCRUD);
  router.post("/post-crud", HomePage.postCRUD);
  router.get("/display", HomePage.displayCROD);
  router.get("/edit-crud", HomePage.editCROD);
  router.post("/put-crud", HomePage.putCRUD);
  router.get("/delete-crud", HomePage.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  return app.use("/", router);
};
module.exports = initWebRoutes;
