import UserService from "../services/UserService";
import Util from "../utils/Utils";
import AuthUtils from "../utils/AuthUtils";
const util = new Util();

export default class AuthController {

  static async login(req, res) {
    if (!req.body.username || !req.body.password) {
      util.setError(400, "Please provide complete details");
    }

    const bodyUser = req.body;
    try {
      const theUser = await UserService.getOneByUsername(bodyUser.username);
      if (theUser) {
        const valid = await AuthUtils.checkPassword(
          bodyUser.password,
          theUser.password
        );
        
        if(valid){
            let token = AuthUtils.generateJwtToken(theUser)
            theUser.token = token
            const savedUser = await theUser.save()
            util.setSuccess(200, "User retrieved", savedUser)
        }else{
            util.setError(400, "Cant validate user");
        }

      } else {
        util.setError(400, "Cant validate user");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}
