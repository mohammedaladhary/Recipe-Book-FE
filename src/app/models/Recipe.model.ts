import { FoodType } from "./FoodType.model";

export class Recipe {
    constructor(
        private _recipeId: number | null,
        private _recipeName: string,
        private _calories: number,
        private _description: string,
        private _foodType: FoodType,
        private _userId: number  // Add user_id property
    ) {}
    public get userId(): number {
        return this._userId;
    }
    public set userId(value: number) {
        this._userId = value;
    }
    public get foodType(): FoodType {
        return this._foodType;
    }

    public set foodType(value: FoodType) {
        this._foodType = value;
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