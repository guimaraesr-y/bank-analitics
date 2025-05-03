import { UserInterface } from "src/users/domain/entities/user";

export interface UserRepositoryInterface {

  findByEmail(email: string): Promise<UserInterface | null>;
  createUser(user: Partial<UserInterface>): Promise<UserInterface>;
  updateUser(id: string, updateData: Partial<UserInterface>): Promise<UserInterface>;
  deleteUser(id: string): Promise<void>;

}
