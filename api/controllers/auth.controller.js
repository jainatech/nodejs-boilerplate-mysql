const bcrypt = require("bcrypt");
const {
  generateToken
} = require("../helpers/auth.helper");
const { GeneralResponse } = require("../utils/response");
const { GeneralError, UnAuthorized } = require("../utils/error");
const usersModel = require("../models/users.model");
const config = require("../utils/config");
const saltRounds = 10;

exports.register = async (req, res, next) => {
  try {
    let { fname, lname, email, pass } = req.body;
    const encryptedPassword = await bcrypt.hash(pass, saltRounds);
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (!err && response.length > 0)
        next(
          new GeneralError(
            "user already exist",
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      else {
        usersModel.createUser(
          { fname, lname, email, pass: encryptedPassword },
          (err, response) => {
            if (err || response.affectedRows == 0)
              next(new GeneralError("user registeration failed"));
            else
              next(
                new GeneralResponse(
                  "user successfully registered",
                  undefined,
                  config.HTTP_CREATED
                )
              );
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError("user registeration failed"));
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, pass } = req.body;
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (err || response.length === 0) next(new GeneralError("user not found", undefined, config.HTTP_ACCEPTED));
      else {
        const comparision = await bcrypt.compare(pass, response[0].pass);
        if (comparision) {
          let userdata = {
            username: response[0].email,
            fname: response[0].fname,
            lname: response[0].lname,
            userid: response[0].userid,
          };
          let token = generateToken(userdata);
          next(
            new GeneralResponse("user successfully login", {
              token: token
            }, config.HTTP_SUCCESS)
          );
        } else {
          next(new UnAuthorized("email and password does not match"));
        }
      }
    });
  } catch (err) {
    next(new GeneralError("user login failure"));
  }
};
