import <%= servicename %> from '../services/<%= servicename %>';
import Util from '../utils/Utils';

const util = new Util();

class <%= controllername %>  {
  static async getAll(req, res) {
    try {
      const all<%= modelname %>s = await <%= servicename %>.getAll();
      if (all<%= modelname %>s.length > 0) {
        util.setSuccess(200, '<%= modelname %> retrieved', all<%= modelname %>s);
      } else {
        util.setSuccess(200, 'No <%= modelname %> found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addOne(req, res) {
    <% if(fieldsRequiered.length != 0){%>
    if (<% fieldsRequiered.forEach( (field,index) => {%>!req.body.<%=field.fieldName%><% if(index != fieldsRequiered.length -1){%> || <%}%><%})%>) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    <%}%>
    const new<%= modelname %>  = req.body;
    try {
      const created<%= modelname %>  = await <%= servicename %>.addOne(new<%= modelname %> );
      util.setSuccess(201, '<%= modelname %>  Added!', created<%= modelname %> );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateOne(req, res) {
    const altered<%= modelname %>  = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updated<%= modelname %>  = await <%= servicename %>.updateOne(id, altered<%= modelname %>);
      if (!updated<%= modelname %> ) {
        util.setError(404, `Cannot find <%= modelname %>  with the id: ${id}`);
      } else {
        util.setSuccess(200, '<%= modelname %>  updated', updated<%= modelname %> );
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
      const the<%= modelname %>  = await <%= servicename %>.getOne(id);

      if (!the<%= modelname %> ) {
        util.setError(404, `Cannot find <%= modelname %>  with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found <%= modelname %> ', the<%= modelname %> );
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
      const <%= modelname.toLowerCase() %>ToDelete = await <%= servicename %>.deleteOne(id);

      if (<%= modelname.toLowerCase() %>ToDelete) {
        util.setSuccess(200, '<%= modelname %>  deleted');
      } else {
        util.setError(404, `<%= modelname %>  with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default <%= controllername %>;
