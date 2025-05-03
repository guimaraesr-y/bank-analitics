import { User } from "src/users/domain/entities/user";

export class SignUpResponse extends User {

  accessToken: string;

  constructor(partial: Partial<SignUpResponse> = {}) {
    super(partial);
    Object.assign(this, partial);
  }

}
