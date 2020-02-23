"use strict";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export default class AuthUtils {
  static async generatePasswordHash(password) {
    const saltRounds = 10;
    const pswd = escape(password);
    const hash = await bcrypt.hash(pswd, saltRounds);
    if (hash) {
      return hash;
    }
    return null;
  }

  static async checkPassword(password, hash) {
    const pswd = escape(password);
    const match = await bcrypt.compare(pswd, hash.toString());
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
    let accesToken = jwt.sign(plainJsonUser, config.jwt.tokenSecret, {
      expiresIn: config.jwt.expirationTime
    });
    return accesToken;
  }

  static async validateJwtToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, config.jwt.tokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }

  static basicauth(user) {
    let accesToken = jwt.sign(user.username, config.jwt.tokenSecret);
    return accesToken;
  }
}
