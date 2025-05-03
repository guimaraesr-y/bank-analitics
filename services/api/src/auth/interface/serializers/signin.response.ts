export class SignInResponse {

  accessToken: string;

  constructor(partial: Partial<SignInResponse> = {}) {
    Object.assign(this, partial);
  }

}
