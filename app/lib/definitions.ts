
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Product = {
    id : string,
    name: string,
    description: string,
    brand_name : string,
    brand_id: number,
    category_id: number,
    category_name : string,
    price : number,
    images : string
}

export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id : string,
  name : string
}
