const { Router } = require("express");
const { check } = require("express-validator");

const { fieldValidator } = require("../middlewares/field-validator");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();
const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const { isDate } = require("../helpers/isDate");

router.use(validateJWT);

router.get("/", [fieldValidator], getEvents);

router.post(
  "/",
  [
    check("title", "Title is mandatory").not().isEmpty(),
    check("start", "Start Date is mandatory").custom(isDate),
    check("end", "End Date is mandatory").custom(isDate),
    fieldValidator,
  ],
  addEvent
);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;
