let express = require("express");
let router = express.Router();
let path = require('path');

/**
 * Import Route Files
 */
let auth = require("./route/auth.route");
let user = require("./route/users.route");
let common = require("./route/common.route");

/**
 * Routes - Mobile Application
 */

router.use("/auth", auth);
router.use("/common", common);
router.use("/user",user);

/**
 * Routes - Admin 
*/

module.exports = router;
