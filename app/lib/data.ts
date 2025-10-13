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

const ITEMS_PER_PAGE = 8;

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
  brand?: string, 
  category?: string, 
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  let whereClauses: string[] = [];
  let params: any[] = [];

  // Búsqueda por query
  if (query) {
    whereClauses.push(`(products.name ILIKE $${params.length + 1} OR products.brand_name ILIKE $${params.length + 1} OR products.category_name ILIKE $${params.length + 1})`);
    params.push(`%${query}%`);
  }

  // Filtro por marca
  if (brand) {
    whereClauses.push(`products.brand_name = $${params.length + 1}`);
    params.push(brand);
  }

  // Filtro por categoría
  if (category) {
    whereClauses.push(`products.category_name = $${params.length + 1}`);
    params.push(category);
  }

  // Construyo el WHERE
  const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  // Query final
  const result = await sql.query(
    `
      SELECT
        products.id,
        products.name,
        products.description,
        products.brand_name,
        products.category_name,
        products.price,
        products.image
      FROM products
      ${where}
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `,
    params
  );

  return result.rows;
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



export async function fetchProductsPages(query?: string, brand?: string, category?: string) {
  noStore();
  try {
    let whereClauses: string[] = [];
    let params: any[] = [];

    // Filtro por texto
    if (query) {
      whereClauses.push(
        `(products.name ILIKE $${params.length + 1} 
          OR products.brand_name ILIKE $${params.length + 1} 
          OR products.category_name ILIKE $${params.length + 1})`
      );
      params.push(`%${query}%`);
    }

    // Filtro por marca
    if (brand) {
      whereClauses.push(`products.brand_name = $${params.length + 1}`);
      params.push(brand);
    }

    // Filtro por categoría
    if (category) {
      whereClauses.push(`products.category_name = $${params.length + 1}`);
      params.push(category);
    }

    const where = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    // Query count
    const count = await sql.query(
      `
        SELECT COUNT(*) 
        FROM products
        ${where}
      `,
      params
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
  }
}


export async function fetchTotalProductsNumber() {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*) FROM products`;
    return Number(count.rows[0].count);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of products.");
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
