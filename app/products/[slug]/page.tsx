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

const LoadingUI = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-200 blur-xl opacity-30 animate-pulse"></div>
        </div>
        <h1 className="text-xl font-bold text-gray-700">
          Hang tight! We’re bringing your awesome products...
        </h1>
        <p className="text-gray-500">
          Great things are worth the wait. Your perfect picks are on their way!
        </p>
      </div>
    </div>
  );
};

const ProductDetails = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"ratings" | "reviews">("ratings"); // State for tabs

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
          quantity,
          reviews
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
    return <LoadingUI />;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-6 py-12 bg-gray-50">
        <div className="relative flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 relative">
            <img
              src={urlFor(product.image).url()}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
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

          <div className="w-full md:w-1/2 flex flex-col space-y-6 px-6 pt-8 bg-white rounded-lg shadow-md">
            <p className="text-gray-700">{product.description}</p>
            
            <div className="border-b border-gray-300 mb-4">
              <button
                onClick={() => setActiveTab("ratings")}
                className={`px-4 py-2 ${
                  activeTab === "ratings" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                }`}
              >
                Ratings
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 ${
                  activeTab === "reviews" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
                }`}
              >
                Reviews
              </button>
            </div>

            {activeTab === "ratings" && (
              <div className="flex items-center">
                <span className="text-lg font-semibold mr-2">Rating:</span>
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
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Customer Reviews:</h3>
                <ul className="space-y-4">
                  {product.reviews?.map((review: string, index: number) => (
                    <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                      {review}
                    </li>
                  )) || <p>No reviews available for this product.</p>}
                </ul>
              </div>
            )}

            <div className="flex items-center space-x-6">
              <span className="text-lg font-semibold text-gray-700">Quantity:</span>
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

            <div className="flex space-x-4">
              <button
                className="bg-[#2e224d] text-white py-3 px-6 rounded-md hover:bg-blue-700"
                onClick={() => handleAddToCart(product)}
              >
                Add To Cart
              </button>
              <Link
                href="/payment"
                className="bg-[#2e224d] text-white py-3 px-6 rounded-md hover:bg-[#241c3c]"
              >
                Go to Checkout
              </Link>
            </div>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>You&apos;ve added a product!</AlertDialogTitle>
                  <AlertDialogDescription>
                    {`${product.name} has been added to your cart. Continue shopping or proceed to checkout.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setShowDialog(false)}>
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
