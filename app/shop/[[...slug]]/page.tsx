import { Suspense } from 'react'
import Products from '@/components/products';
import { Skeleton } from "@/components/ui/skeleton";
import { Links } from "@/components/links"
import algoliasearch from 'algoliasearch/lite';

export function generateStaticParams() {
  const params = [
    { slug: ['appliances'] }, { slug: ['audio'] }
  ]
  return params;
}

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const index = client.initIndex('instant_search');

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
  const results = await index.search(q, {
    attributesToRetrieve: ['*'],
    hitsPerPage: 30,
    facetFilters: ff,
  });
  return results.hits;
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
  const hits = await getProducts(category, query);

    return (
      <div className="grid grid-cols-4 min-h-screen">
        <div className="grid-cols-1 h-full gap-4 p-6 pt-0 bg-gray-100/40 dark:bg-gray-800/40">
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Links />
          </Suspense>
        </div>
        <div className="col-span-3 h-full gap-4 p-6 pt-0 ">
          <h2 className="mt-5">Products: {params.slug} {(query.length > 2)? '+ "'+ query +'"': ''}</h2>
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Products hits={hits}/> 
          </Suspense>
        </div>
      </div>
    )
}