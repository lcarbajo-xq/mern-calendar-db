/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { fieldValidator } = require("../middlewares/field-validator");

const { createUser, loginUser, renewToken } = require("../controllers/auth");

router.post(
  "/new",
  [
    check("name", "Name is mandatory").not().isEmpty(),
    // check("email", "Email is mandatory").not().isEmpty(),
    // check("email", "Email format is wrong").isEmail(),
    check("password", "Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is mandatory").not().isEmpty(),
    check("email", "Email format is wrong").isEmail(),
    check("password", "Password debe de ser de 6 caracteres").isLength({
      min: 6,
    }),
    fieldValidator,
  ],
  loginUser
);

router.get("/renew", renewToken);

module.exports = router;
