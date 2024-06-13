
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export type Product = {
    id : string,
    name: string,
    decription: string,
    brandname : string,
    brandid: number,
    categoryid: number,
    categoryname : string,
    price : number,
    sizes : number[],
    images : string
}

export type Category = {
  id: number;
  name: string;
};

export type Brand = {
  id : number,
  name : string
}
