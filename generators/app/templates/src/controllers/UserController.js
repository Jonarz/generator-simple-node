import UserService from '../services/UserService';
import Util from '../utils/Utils';
import AuthUtils from '../utils/AuthUtils';

const util = new Util();

class UserController  {
  static async getAll(req, res) {
    try {
      const allUsers = await UserService.getAll();
      if (allUsers.length > 0) {
        util.setSuccess(200, 'User retrieved', allUsers);
      } else {
        util.setSuccess(200, 'No User found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async addOne(req, res) {
    if (!req.body.username || !req.body.password) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newUser  = req.body;
    try {
      newUser.password  = await AuthUtils.generatePasswordHash(newUser.password)
      const createdUser  = await UserService.addOne(newUser );
      util.setSuccess(201, 'User  Added!', createdUser );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateOne(req, res) {
    const alteredUser  = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updatedUser  = await UserService.update(id, alteredUser);
      if (!updatedUser ) {
        util.setError(404, `Cannot find User  with the id: ${id}`);
      } else {
        util.setSuccess(200, 'User  updated', updatedUser );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getOne(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theUser  = await UserService.get(id);

      if (!theUser ) {
        util.setError(404, `Cannot find User  with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found User ', theUser );
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteOne(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const userToDelete = await UserService.deleteOne(id);

      if (userToDelete) {
        util.setSuccess(200, 'User  deleted');
      } else {
        util.setError(404, `User  with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default UserController;
