"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthUtils {

  static async generatePasswordHash(password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    if (hash) {
      return hash;
    }

    return null;
  }

  static async checkPassword(password, hash) {
    const match = await bcrypt.compare(password.toString(), hash.toString());
    if (match) {
      return true;
    }
    return false;
  }

  static generateJwtToken(user) {
    const plainJsonUser = {
      id: user.id,
      username: user.username
    };
    let accesToken = jwt.sign(plainJsonUser, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "24h"
    });
    return accesToken;
  }

  static async validateJwtToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

  static basicauth(user) {
    let accesToken = jwt.sign(user.username, process.env.ACCESS_TOKEN_SECRET);
    return accesToken;
  }
}
