import React from 'react';
import { Button } from "@/components/ui/button"


const Products: React.FC = () => {
    return (
        <div>
              <div className="card">
                <div className="card-header">
                  <img
                    alt="Product image"
                    className="w-full h-auto"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <h2 className="text-lg font-semibold">Product Name</h2>
                </div>
                <div className="card-content">
                  <p className="text-gray-600">Product description goes here</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">$99.99</span>
                    <Button size="sm" variant="outline">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <img
                    alt="Product image"
                    className="w-full h-auto"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <h2 className="text-lg font-semibold">Product Name</h2>
                </div>
                <div className="card-content">
                  <p className="text-gray-600">Product description goes here</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">$99.99</span>
                    <Button size="sm" variant="outline">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <img
                    alt="Product image"
                    className="w-full h-auto"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "200/200",
                      objectFit: "cover",
                    }}
                    width="200"
                  />
                  <h2 className="text-lg font-semibold">Product Name</h2>
                </div>
                <div className="card-content">
                  <p className="text-gray-600">Product description goes here</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">$99.99</span>
                    <Button size="sm" variant="outline">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

        </div>
    );
};

export default Products;
