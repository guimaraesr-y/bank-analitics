export interface BaseUserInterface {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserInterface extends BaseUserInterface {
    id: number;
}

export class User implements UserInterface {
    
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(partial: Partial<UserInterface> = {}) {
        Object.assign(this, partial);
    }

}
