import React from 'react';
import { Button } from "@/components/ui/button"
import algoliasearch from 'algoliasearch/lite';
import Image from 'next/image'

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const index = client.initIndex('instant_search');

type CategoryIndex = {
  [key: string]: string; // Add index signature
};

const mapCategoryToIndex: CategoryIndex = {
  healthfitness: 'Health, Fitness & Beauty',
  electronics: 'Computers & Tablets',
  accessories: 'Household Essentials',
};

async function getProducts(category?: Array<string>, query?: string) {
  const ff = category && category['0'] ? [[`hierarchicalCategories.lvl0:${mapCategoryToIndex[category['0']]}`]] : [];
  const q = query && query.length > 2 ? query : '';
  //console.log("Facet filters: ", ff);
  const results = await index.search(q, {
    attributesToRetrieve: ['*'],
    hitsPerPage: 30,
    facetFilters: ff,
  });
  return results.hits;
}

export async function Products(props: any) {
  //console.log("Products for category: ", props.category);
  const hits = await getProducts(props.category, props.query);
 // console.log(hits);
    return (
      <div className="flex flex-col gap-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      Add to Cart
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
