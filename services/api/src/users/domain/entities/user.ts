export interface BaseUserInterface {
    email: string;
    password: string;
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
        Object.assign(this, partial);
    }

}
