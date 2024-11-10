import React from "react";

export interface dataType {
    quantity: number;
    _id: string;
    name: string;
    stock: number;
    description?: string;
    img: string;
    type: string;
    price: number;
}

export interface dataTypeProps {
    data: dataType[];
    setData?: React.Dispatch<React.SetStateAction<dataType[]>>;
    searchTerm: string;
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>
    cartItems?:dataType[];
    setCartItems?:React.Dispatch<React.SetStateAction<dataType[]>>;
    quantity?:number;
}

export interface searchTermProps {
    searchTerm: string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
    data?: dataType[],
    setData?: (value: (((prevState: dataType[]) => dataType[]) | dataType[])) => void
    cartItems?:dataType[];
    setCartItems?:React.Dispatch<React.SetStateAction<dataType[]>>;
}

export interface formTypes{
    FullName:string;
    EmailAddress:string;
    PhoneNumber:number;
    Address:string;
    City:string;
    ZipCode:number;
    CardNumber:number;
    CardholderName:string;
    ExpirationDate:number;
    CVV:number;
}


