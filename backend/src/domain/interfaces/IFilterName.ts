export interface IFilterName {
    name?: { $regex: string; $options: string };
}