import { sql } from '@vercel/postgres';
import { 
    Brand,
    Category,
    Product,
    User,
 } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
const ITEMS_PER_PAGE = 6;

export async function fetchBrands() {
    noStore();
    try{
      const data = await sql<Brand>`SELECT * FROM brands`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch brands data.');
    }
}

export async function fetchCategories() {
    noStore();
    try{
      const data = await sql<Category>`SELECT * FROM categories`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch categories data.');
    }
}

export async function fetchCategoryById(id : string) {
  noStore();
  try{
    const data = await sql<Category>`
      SELECT *
      FROM categories
      WHERE categories.id = ${id}
    `;

    const category = data.rows.map((category) => ({
      ...category}))

    return category[0]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch category data.');
  }
}



export async function fetchProducts() {
    noStore();
    try{
      const data = await sql<Product>`SELECT * FROM products`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products data.');
    }
}

export async function fetchProductById(id : string) {
  noStore();
  try{
    const data = await sql<Product>`
      SELECT *
      FROM products
      WHERE products.id = ${id}
    `;

    const product = data.rows.map((product) => ({
      ...product}))

    return product[0]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}


export async function fetchOverviewCardsData(){
  noStore();
  try{
    const usersCountPromise = sql`SELECT COUNT(*) FROM users`;
    const productsCountPromise = sql`SELECT COUNT(*) FROM products`;
    const categoriesCountPromise = sql`SELECT COUNT(*) FROM categories`;
    const brandsCountPromise = sql`SELECT COUNT(*) FROM brands`;

    const data = await Promise.all([
      usersCountPromise,
      productsCountPromise,
      categoriesCountPromise,
      brandsCountPromise,
    ]);

    const numberOfUsers = Number(data[0].rows[0].count ?? '0');
    const numberOfProducts = Number(data[1].rows[0].count ?? '0');
    const numberOfCategories = Number(data[2].rows[0].count ?? '0');
    const numberOfBrands = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfUsers,
      numberOfProducts,
      numberOfCategories,
      numberOfBrands,
    };

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch overview data.');
  }

}

export async function getUser(email: string) {
    try {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0] as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
}