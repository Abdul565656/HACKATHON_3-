import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31',
});

// Helper function to upload images to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    });
    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

// Helper function to fetch or create a category and return its ID
async function getCategoryRef(categoryName) {
  try {
    // Query Sanity for the category
    const query = `*[_type == "category" && name == $name][0]`;
    const params = { name: categoryName };
    const category = await client.fetch(query, params);

    if (category) {
      console.log(`Category found: ${categoryName} with ID ${category._id}`);
      return category._id;
    } else {
      // Create the category if it doesn't exist
      console.log(`Category not found. Creating category: ${categoryName}`);
      const newCategory = await client.create({
        _type: 'category',
        name: categoryName,
        slug: {
          _type: 'slug',
          current: categoryName.toLowerCase().replace(/\s+/g, '-'),
        },
      });
      console.log(`Category created: ${categoryName} with ID ${newCategory._id}`);
      return newCategory._id;
    }
  } catch (error) {
    console.error(`Error fetching or creating category: ${categoryName}`, error);
    return null;
  }
}

// Main function to import data
async function importData() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://hackathon-apis.vercel.app/api/products');
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.title}`);

      // Upload product image
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Fetch or create category reference
      let categoryRef = null;
      if (product.category) {
        categoryRef = await getCategoryRef(product.category);
      }

      // Create slug from product name
      const slug = product.name.toLowerCase().replace(/\s+/g, '-');

      // Construct the product object
      const sanityProduct = {
        _type: 'product',
        name: product.name,
        slug: { _type: 'slug', current: slug },
        description: product.description,
        price: product.price,
        quantity: product.stock || 0,
        tags: product.category ? [product.category] : [],
        features: product.features || [],
        dimensions: product.dimensions || {},
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
        category: categoryRef
          ? {
              _type: 'reference',
              _ref: categoryRef,
            }
          : undefined,
      };

      // Upload product to Sanity
      console.log('Uploading product to Sanity:', sanityProduct.name);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
