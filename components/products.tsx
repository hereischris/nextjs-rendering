import React from 'react';
import { Button } from "@/components/ui/button"

import Image from 'next/image'


export async function Products(props: any) {
  const hits = props.hits ? props.hits : [];
    if (hits.length<1) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-semibold">No products found</h1>
          <p className="text-gray-600 mt-2">Try another search term</p>
        </div>
      );
    }
    return (
      <div className="gap-4 p-6">
        <div className="grid grid-cols-3 gap-6">
          { 
            hits.map((hit: any) => (
              <div className="card" key={hit.name}>
                <div className="card-header">
                  <Image
                    alt="Product image"
                    className="w-full h-auto"
                    height="300"
                    src={hit.image}
                    style={{
                      aspectRatio: "100/100",
                      objectFit: "contain",
                      backgroundColor: "white"
                    }}
                    width="300"
                  />
                  <h2 className="text-lg font-semibold">{hit.name}</h2>
                </div>
                <div className="card-content">
                  <p className="text-gray-600 text-xs">{hit.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-600">{hit.price} €</span>
                    <Button size="sm" variant="outline">
                      Add to Cart1
                    </Button>
                  </div>
                </div>
              </div>
           ))
          }
        </div>

      </div>
    );
};

export default Products;
