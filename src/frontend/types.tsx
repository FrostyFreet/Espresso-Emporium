export interface dataType {
    _id: string;
    name: string;
    stock: number;
    description?: string;
    img: string;
    type: string;
    price: number;
}
export interface dataTypeProps {
    data:dataType[];
}