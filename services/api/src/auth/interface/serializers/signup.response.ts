import { User } from "src/users/domain/entities/user";
import { BasicUserResponse } from "src/users/interface/serializers/basic-user.response";

export class SignUpResponse extends BasicUserResponse {

  accessToken: string;

  constructor(partial: Partial<SignUpResponse> = {}) {
    super(partial);
    Object.assign(this, partial);
  }

}
