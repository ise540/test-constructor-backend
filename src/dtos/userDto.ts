import type { User } from "../models/User";

export class UserDto {
    email:string;
    id:string;
    isActivated:boolean;

    constructor(model:User) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}