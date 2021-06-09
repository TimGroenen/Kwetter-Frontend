export class Auth {
    email: string;
    name: string;
    password: string;

    constructor(email: string, password: string, name: string = "") {
        this.email = email;
        this.name = name;
        this.password = password;
    }
}
