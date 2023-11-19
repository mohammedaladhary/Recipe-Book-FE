export class User {
    constructor(
        private _userId: number | null,
        private _name: string,
        private _email: string,
        private _password: string,
    ) {}
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get userId(): number | null {
        return this._userId;
    }
    public set userId(value: number | null) {
        this._userId = value;
    }
}