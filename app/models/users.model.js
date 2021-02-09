const sql = require("./db.js");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// constructor
const User = function(user) {
    this.lastname= user.lastname;
    this.firstname= user.firstname;
    this.email= user.email;
    this.password= user.password;
    this.gender= user.gender;
    this.birthdate= user.birthdate;
  };
  
  User.create = (newUser, result) => {
    console.log(newUser)
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { user_id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };
  
  User.checkCredential = (email, password, result) => {
    console.log(password)
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      /**
       *  if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).send({ auth: false, token: null });
          }
       */

      if (res.length) {
        console.log("found user: ", res[0]);
        user = res[0]
        if(user.password != password){
          console.log(res[0].password +" "+ password)
          result(null, {auth: false, token: null })
          return
        }
        var token = jwt.sign({ ID: user.id, }, 'secret', { expiresIn: '2h' });
        const userInfo = {
          auth: true,
          status: "OK",
          token: token,
          expiresIn: 60 * 60 * 24 * 365,
          user: user
        }
        result(null, userInfo);
        return;
      }
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };


  User.findById = (userId, result) => {
    sql.query(`SELECT * FROM users WHERE user_id = ${userId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  
  User.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the email
      result({ kind: "not_found" }, null);
    });
  };
  
  
  
  User.getAll = result => {
    sql.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("users: ", res);
      result(null, res);
    });
  };
  
  
  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE users SET lastname = ?, firstname = ?, email = ?, password = ?, gender = ?, birthdate =? WHERE user_id = ?",
      [user.lastname, user.firstname, user.email, user.password, user.gender, user.birthdate, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated user: ", { user_id: id, ...user });
        result(null, { user_id: id, ...user });
      }
    );
  };
  
  User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE user_id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted user with user_id: ", id);
      result(null, res);
    });
  };
  
  User.removeAll = result => {
    sql.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} users`);
      result(null, res);
    });
  };
  
  module.exports = User;