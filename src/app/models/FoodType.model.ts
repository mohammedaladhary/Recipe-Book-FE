import { Recipe } from "./Recipe.model";

export class FoodType {
    constructor(
        private _foodTypeId: number | null,
        private _foodTypeName: string,
        private _recipes: Recipe,
    ) {}
    public get recipes(): Recipe {
        return this._recipes;
    }
    public set recipes(value: Recipe) {
        this._recipes = value;
    }
    public get foodTypeName(): string {
        return this._foodTypeName;
    }
    public set foodTypeName(value: string) {
        this._foodTypeName = value;
    }
    public get foodTypeId(): number | null {
        return this._foodTypeId;
    }
    public set foodTypeId(value: number | null) {
        this._foodTypeId = value;
    }
}