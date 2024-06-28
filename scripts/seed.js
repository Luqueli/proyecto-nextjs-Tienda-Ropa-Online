const { db } = require('@vercel/postgres');
const {
  users,
  categories,
  brands,
  products,
} = require('../app/lib/placeholder-data.js');

const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
            );
        `;
        console.log(`Created "users" table`);
  
        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return client.sql`
            INSERT INTO users (email, password)
            VALUES (${user.email}, ${hashedPassword})
            `;
            }),
        );
  
        console.log(`Seeded ${insertedUsers.length} users`);
  
        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
      console.error('Error seeding users:', error);
      throw error;
    }
}

async function seedCategories(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "categories" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS categories (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          );
        `;
    
        console.log(`Created "categories" table`);
    
        // Insert data into the "categories" table
        const insertedCategories= await Promise.all(
          categories.map(async (category) => {
            return client.sql`
            INSERT INTO categories (name)
            VALUES (${category.name});
          `;
          }),
        );
    
        console.log(`Seeded ${insertedCategories.length} categories`);
    
        return {
          createTable,
          categories: insertedCategories,
        };
    } catch (error) {
        console.error('Error seeding categories:', error);
        throw error;
    }
}

async function seedBrands(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "brands" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS brands (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          );
        `;
    
        console.log(`Created "brands" table`);
    
        // Insert data into the "brands" table
        const insertedBrands= await Promise.all(
          brands.map(async (brand) => {
            return client.sql`
            INSERT INTO brands (name)
            VALUES (${brand.name});
          `;
          }),
        );
    
        console.log(`Seeded ${insertedBrands.length} brands`);
    
        return {
          createTable,
          brands: insertedBrands,
        };
    } catch (error) {
        console.error('Error seeding brands:', error);
        throw error;
    }
}

async function seedProducts(client){
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "products" table if it doesn't exist
        const createTable = await client.sql`
          CREATE TABLE IF NOT EXISTS products (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255),
            brand_name VARCHAR(255),
            category_name VARCHAR(255),
            price INT NOT NULL,
            image TEXT,
            cloudinary_public_id TEXT
          );
        `;
    
        console.log(`Created "products" table`);
    
        const insertedProducts= await Promise.all(
          products.map(async (product) => {
            return client.sql`
            INSERT INTO products (name,description,brand_name,category_name,price,image,cloudinary_public_id)
            VALUES ( 
              ${product.name},
              ${product.description},
              ${product.brandname},
              ${product.categoryname},
              ${product.price},
              ${product.image},
              ${product.cloudinary_public_id}
            );
          `;
          }),
        );
  
        console.log(`Seeded ${insertedProducts.length} products`);
    
        return {
          createTable,
          products: insertedProducts,
        };
    } catch (error) {
        console.error('Error seeding products:', error);
        throw error;
    }
}

async function createPurchaseTable(client){
  try{
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createPurchaseTable= await client.sql`
    CREATE TABLE IF NOT EXISTS purchase(
       purchaseID SERIAL PRIMARY KEY,
       timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       
       paymentMPID INT NOT NULL,
       buyerEmail VARCHAR(255) NOT NULL,
       totalCost DECIMAL(10, 2) NOT NULL
    );
    `;
    console.log("Table purchases created.");
    return {
      createPurchaseTable
    };

  }
  catch(error){
    console.log("Error creating the historial of purchase");
    throw error;
  }
}

async function createPurchasesDetailTable(client){
  try{
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    
    const createPurchaseDetailTable= await client.sql`
    CREATE TABLE IF NOT EXISTS purchaseDetail(
       detaliID SERIAL PRIMARY KEY,
       purchase_id SERIAL REFERENCES purchase(purchaseID) ON DELETE CASCADE,
       product_id UUID REFERENCES products(id),
       productName VARCHAR(255) NOT NULL,
       quantity INT NOT NULL,
       itemPrice DECIMAL(10, 2) NOT NULL
      );
    `;

    console.log("Table detailsPurchase created.");
    return {
      createPurchaseDetailTable
    };


  }catch(error){
    console.log
  }
}



async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await seedCategories(client);
  await seedBrands(client);
  await seedProducts(client);
  await createPurchaseTable(client);
  await createPurchasesDetailTable(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});