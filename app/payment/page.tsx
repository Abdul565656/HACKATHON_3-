import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Checkout</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Details */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Details</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" placeholder="john.doe@example.com" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" placeholder="123 Main St, City, Country" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="(123) 456-7890" className="mt-1" />
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <ul className="divide-y divide-gray-200 mb-4">
                <li className="flex justify-between py-2">
                  <span>Chair Name</span>
                  <span>$120.00</span>
                </li>
                <li className="flex justify-between py-2">
                  <span>Table Name</span>
                  <span>$200.00</span>
                </li>
                <li className="flex justify-between py-2 font-medium">
                  <span>Total</span>
                  <span>$320.00</span>
                </li>
              </ul>
              <Button className="w-full mt-4">Proceed to Payment</Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;