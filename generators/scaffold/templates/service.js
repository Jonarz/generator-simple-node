import database from '../db';

class <%= servicename %> {
  static async getAll() {
    try {
      return await database.<%= modelname %>.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addOne(new<%= modelname %>) {
    try {
      return await database.<%= modelname %>.create(new<%= modelname %>);
    } catch (error) {
      throw error;
    }
  }

  static async updateOne(id, update<%= modelname %>) {
    try {
      const <%= modelname.toLowerCase() %>ToUpdate = await database.<%= modelname %>.findOne({
        where: { id: Number(id) }
      });

      if (<%= modelname.toLowerCase() %>ToUpdate) {
        await database.<%= modelname %>.update(update<%= modelname %>, { where: { id: Number(id) } });

        return update<%= modelname %>;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id) {
    try {
      const the<%= modelname %> = await database.<%= modelname %>.findOne({
        where: { id: Number(id) }
      });

      return the<%= modelname %>;
    } catch (error) {
      throw error;
    }
  }

  static async deleteOne(id) {
    try {
      const <%= modelname.toLowerCase() %>ToDelete = await database.<%= modelname %>.findOne({ where: { id: Number(id) } });

      if (<%= modelname.toLowerCase() %>ToDelete) {
        const deleted<%= modelname %> = await database.<%= modelname %>.destroy({
          where: { id: Number(id) }
        });
        return deleted<%= modelname %>;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default <%= servicename %>;
