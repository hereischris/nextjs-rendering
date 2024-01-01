import { Suspense } from 'react'
import Products from '@/components/products';
import { Skeleton } from "@/components/ui/skeleton";
import { Links } from "@/components/links"
import { MultiSelectFilter } from '@/components/multiselectfilter';
import algoliasearch from 'algoliasearch';
import { createFetchRequester } from '@algolia/requester-fetch';

export const runtime = 'edge'; 

export function generateStaticParams() {
  const params = [
    { slug: [''] }, { slug: ['appliances'] }, { slug: ['audio'] }
  ]
  return params;
}

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76', {
  requester: createFetchRequester(),
});
//const index = client.initIndex('instant_search');

type CategoryIndex = {
  [key: string]: string; // Add index signature
};

const mapCategoryToIndex: CategoryIndex = {
  healthfitness: 'Health, Fitness & Beauty',
  electronics: 'Computers & Tablets',
  accessories: 'Household Essentials',
  appliances: 'Appliances',
  audio: 'Audio',
  cameras: 'Cameras & Camcorders',
  phones: 'Cell Phones',
  computers: 'Computers & Tablets',
  tv: 'TV & Home Theater',
};

async function getProducts(category?: Array<string>, query?: string) {
  const ff = category && category['0'] ? [[`hierarchicalCategories.lvl0:${mapCategoryToIndex[category['0']]}`]] : [];
  const q = query && query.length > 2 ? query : '';
  //console.log("Facet filters: ", ff);

  const algoliaQueries = [
    {
      indexName: 'instant_search',
      query: q,
      params: {
        facets: ['*'],
        hitsPerPage: 30,
        facetFilters: ff,
      },
    },
    {
      indexName: 'instant_search',
      query: q,
      params: {
        facets: ['hierarchicalCategories.lvl0'],
        hitsPerPage: 10,
      },
    }
  ];
  const results : any = await client.multipleQueries(algoliaQueries);
  return results.results;
}

export default async function Page(
    { params, searchParams }: { 
      params: {  slug: string[] }, 
      searchParams?: {
        query?: string;
        page?: string;
      }
    }) 
  {
  console.log("Page params: ", params, searchParams);
  const category = params.slug;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const results = await getProducts(category, query);
  //console.log("Results: ", results[0].facets);
    return (
      <div className="grid grid-cols-4 min-h-screen">
        <div className="grid-cols-1 h-full gap-4 p-6 pt-0 bg-gray-100/40 dark:bg-gray-800/40">
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Links facets={results[0]} catMap={mapCategoryToIndex} speakingMenu={results[1]}/>
          </Suspense>
        </div>
        <div className="col-span-3 gap-4 p-6 pt-0 ">
          
          <div className='grid grid-cols-3 gap-1 p-1 pt-0 '>
            <div className="grid-cols-1 gap-4 pt-0 ">
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter facets={results[0].facets['brand']} name='Brands' facetName='brands' />
              </Suspense>
            </div>
            <div className="col-span-1 gap-4  pt-0 " >
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter facets={results[0].facets['type']} name ='Type' facetName='type' />
              </Suspense>
            </div>
            <div className="col-span-1 gap-4  pt-0 ">
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter facets={results[0].facets['rating']} name ='Rating' facetName='rating'  />
              </Suspense>
            </div>
          </div>
          <h2 className="">Products: {params.slug} {(query.length > 2)? '+ "'+ query +'"': ''}</h2>
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Products hits={results[0].hits}/> 
          </Suspense>
        </div>
      </div>
    )
}