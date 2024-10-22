export interface IFilterTitle {
    title?: { $regex: string; $options: string };
}