import { BasicUserResponseInterface, UserInterface } from "src/users/domain/entities/user";

export class BasicUserResponse implements BasicUserResponseInterface {

  id: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(partial: Partial<UserInterface> = {}) {
    const keys = Object.keys(partial);

    keys.forEach(key => {
      if (!this.hasOwnProperty(key)) {
        return;
      }

      this[key] = partial[key];
    });
  }

}
