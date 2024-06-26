import { sql } from '@vercel/postgres';
import { 
    Brand,
    Category,
    Product,
    User,
    Purchase,
    PurchaseDetail,
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

export async function fetchProductsByBrand(brand:string) {
  noStore();
  try{
    const data = await sql<Product>`SELECT * FROM products WHERE brand_name=${brand}`;
    return data.rows;
  }
  catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}


export async function fetchFilteredProducts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    noStore();
    const products = await sql<Product>`
      SELECT
        products.id,
        products.name,
        products.description,
        products.brand_name,
        products.category_name,
        products.price,
        products.image
      FROM products
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.category_name ILIKE ${`%${query}%`} OR
        products.brand_name ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return products.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered products.');
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

export async function fetchProductsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM products
      WHERE
        products.name ILIKE ${`%${query}%`} OR
        products.category_name ILIKE ${`%${query}%`} OR
        products.brand_name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProductsImages() {
  noStore();
  try{
    const data = await sql<String>`SELECT images FROM products`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products images.');
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

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchPurchases(){
  noStore();
  try {
    const data = await sql<Purchase>`
    SELECT
        purchaseID,
        to_char(timestamp, 'YYYY-MM-DD HH24:MI:SS') as timestamp,
        buyerEmail,
        totalCost 
    FROM purchase`;
    return data.rows;
  } catch (error) {
    console.error('Failed to fetch purchase:', error);
    throw new Error('Failed to fetch purchases.');
  }
  
}

export async function fetchPurchasesDetails(id : string){
  noStore();
  try {
    const data = await sql<PurchaseDetail>`

      SELECT 
        detaliID,
        purchase_id,
        productName,
        quantity,
        itemPrice
      FROM 
          purchaseDetail
      WHERE 
          purchase_id = ${id}`
    ;

    return data.rows;
  } catch (error) {
    console.error('Failed to fetch purchase:', error);
    throw new Error('Failed to fetch purchases details.');
  }
  
}
