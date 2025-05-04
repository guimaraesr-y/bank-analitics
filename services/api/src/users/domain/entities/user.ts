export interface BaseUserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface BasicUserResponseInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface BasicUserResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserInterface extends BaseUserInterface {
  id: string;
}

export class User implements UserInterface {

  id: string;
  email: string;
  password: string;
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
