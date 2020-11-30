const db = require("../helpers/db.helper");
const selectAll = `id as userid ,first_name as fname, last_name  as lname, email, password as pass`;
const selectStar = `id as userid ,first_name as fname, last_name  as lname, email`;

exports.createUser = (user, callback) => {
  db(
    `INSERT INTO users (first_name,last_name,email,password) values ('${user.fname}','${user.lname}','${user.email}','${user.pass}')`,
    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};

exports.isUserExistByEmailId = (email, callback) => {
  /** Here all columns are taken from users table because of Checking Password Validation Login time */
  db(`Select ${selectAll} from users where email = '${email}'`, (err, response) => {
    if (!err && response) callback(null, response);
    else callback(err);
  });
};

exports.getUsers = (callback) => {
    db(`Select ${selectStar} from users`, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
                response = response.map(user => {
                    delete user.created_at;
                    delete user.updated_at;
                    delete user.password;
                    return user;
                })
            }
            callback(null, response);
        }
        else callback(err);
    })
}

exports.getUserFromId = (userid, callback) => {
  db(`Select ${selectStar} from users where id = '${userid}'`, (err, response) => {
    if (!err && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};

exports.getUserFromEmail = (email, callback) => {
  db(`Select ${selectStar} from users where email = '${email}'`, (err, response) => {
    if (!err && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};
