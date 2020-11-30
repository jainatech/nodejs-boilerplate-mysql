const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/users.controller");
const { authenticate } = require('../../helpers/auth.helper');

router.get("/",authenticate,usersController.list);
router.get("/:userid",authenticate,usersController.getUserByUserId);

module.exports = router;
