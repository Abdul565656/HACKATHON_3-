"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { CiStar } from "react-icons/ci";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await client.fetch(
        `
        *[ _type == "product" && slug.current == $slug][0]{
          name,
          price,
          description,
          discountPercentage,
          priceWithoutDiscount,
          rating,
          image,
          quantity
        }
        `,
        { slug }
      );

      const fetchedRelatedProducts = await client.fetch(
        `
        *[ _type == "product" && slug.current != $slug][0..5]{
          name,
          price,
          discountPercentage,
          priceWithoutDiscount,
          image,
          slug,
          quantity
        }
        `,
        { slug }
      );

      setProduct(fetchedProduct);
      setRelatedProducts(fetchedRelatedProducts);
      setSelectedRating(fetchedProduct?.rating || 0);
    };

    fetchData();
  }, [slug]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement") {
      setQuantity(quantity - 1);
    }
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleAddToCart = (product: any) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ ...product, quantity });
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowDialog(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12 bg-gray-50">
        <div className="relative flex flex-col md:flex-row gap-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={urlFor(product.image).url()}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-8 flex flex-col justify-end z-10">
              <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
              <p className="text-xl text-gray-200 mt-2">Price: ${product.price}</p>
              {product.discountPercentage > 0 && (
                <p className="text-lg text-red-500 mt-2">
                  <span className="line-through text-gray-400">
                    ${product.priceWithoutDiscount}
                  </span>{" "}
                  <strong>{product.discountPercentage}% OFF</strong>
                </p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6 px-6 pt-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-700">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center">
              <span className="text-lg font-semibold mr-2">Your Rating:</span>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, index) => (
                  <CiStar
                    key={index}
                    onClick={() => handleRatingChange(index + 1)}
                    className={`cursor-pointer text-2xl ${
                      index < selectedRating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="flex items-center space-x-6">
              <span className="text-lg font-semibold text-gray-700">
                Quantity:
              </span>
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700"
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>

            {/* Alert Dialog */}
            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You&apos;ve added a product!</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`${product.name} has been added to your cart. Continue shopping or proceed to checkout.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setShowDialog(false)}
                  >
                    Continue Shopping
                  </AlertDialogCancel>
                  <Link href="/carts">
                    <AlertDialogAction>Go to Cart</AlertDialogAction>
                  </Link>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">More Products Like This</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct: any) => (
              <div
                key={relatedProduct.slug.current}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <img
                  src={urlFor(relatedProduct.image).url()}
                  alt={relatedProduct.name}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{relatedProduct.name}</h3>
                <p className="text-gray-600 mt-2">Price: ${relatedProduct.price}</p>
                {relatedProduct.discountPercentage > 0 && (
                  <p className="text-red-500 mt-2">
                    <span className="line-through text-gray-400">
                      ${relatedProduct.priceWithoutDiscount}
                    </span>{" "}
                    {relatedProduct.discountPercentage}% OFF
                  </p>
                )}
                <Link
                  href={`/products/${relatedProduct.slug.current}`}
                  className="mt-4 inline-block text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
