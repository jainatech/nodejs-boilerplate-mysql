const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const usersModel = require("../models/users.model");

exports.list = async (req, res, next) => {
    try {
        usersModel.getUsers((err, response) => {
            if (err) next(new NotFound('no users found'));
            else next(new GeneralResponse('users list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting users list'))
    }
}

exports.getUserByUserId = async (req, res, next) => {
    let { userid } = req.query;
    try {
        usersModel.getUserFromId(userid, (err, response) => {
            if (err) next(new NotFound('user not found'));
            else next(new GeneralResponse('user detail found',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting user detail'))
    }
}