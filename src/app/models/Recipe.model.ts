import { FoodType } from "./FoodType.model";
import { User } from "./User.model";

export class Recipe {
    constructor(
        private _recipeId: number | null,
        private _recipeName: string,
        private _calories: number,
        private _description: string,
        private _user: User,
        private _foodType: FoodType
    ) {}
    public get foodType(): FoodType {
        return this._foodType;
    }
    public set foodType(value: FoodType) {
        this._foodType = value;
    }
    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get calories(): number {
        return this._calories;
    }
    public set calories(value: number) {
        this._calories = value;
    }
    public get recipeName(): string {
        return this._recipeName;
    }
    public set recipeName(value: string) {
        this._recipeName = value;
    }
    public get recipeId(): number | null {
        return this._recipeId;
    }
    public set recipeId(value: number | null) {
        this._recipeId = value;
    }
}