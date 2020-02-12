import database from '../db';

class UserService {
  static async getAll() {
    try {
      return await database.User.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addOne(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateOne(id, updateUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: Number(id) }
      });

      if (userToUpdate) {
        await database.User.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }


  static async getOneByUsername(username) {
    try {
      const theUser = await database.User.findOne({
        where: { username: username }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOne(id) {
    try {
      const userToDelete = await database.User.findOne({ where: { id: Number(id) } });

      if (userToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
