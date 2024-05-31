import { sql } from '@vercel/postgres';
import { 
    Brand,
    Category,
    Product,
    User,
 } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


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

export async function fetchProducts() {
    noStore();
    try{
      const data = await sql<Category>`SELECT * FROM products`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch products data.');
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