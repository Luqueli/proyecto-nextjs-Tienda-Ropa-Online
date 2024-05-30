
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Product = {
    id : number,
    name: string,
    decription: string,
    brand : string,
    category: Category,
    price : number,
    sizes : number[],
    images : string[]
    
}

export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id : string,
  name : string
}
