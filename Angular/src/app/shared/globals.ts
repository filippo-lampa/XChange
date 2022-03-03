import { User } from "./user.model";

export class Globals {

  public static loggedUserDetails: User = new User;

  public static setLoggedUser(loggedUser: User){
    Globals.loggedUserDetails = loggedUser;
  }

}
