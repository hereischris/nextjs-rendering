import { Suspense } from 'react'
import Products from '@/components/products';
import { Skeleton } from "@/components/ui/skeleton";
import { Links } from "@/components/links"
import { MultiSelectFilter } from '@/components/multiselectfilter';
import algoliasearch from 'algoliasearch';
import { createFetchRequester } from '@algolia/requester-fetch';
import { ProductsLoading } from '@/components/ui/productsloading';

export const runtime = 'edge'; 

const algoliaAppId = process.env.ALGOLIA_APP_ID || 'missingappid';
const algoliaApiKey = process.env.ALGOLIA_API_KEY || 'missingkey';
const algoliaIndex = process.env.ALGOLIA_API_INDEX || 'missingindex';

export function generateStaticParams() {
  const params = [
    { slug: [''] }, { slug: ['appliances'] }, { slug: ['audio'] }, { slug: ['computers'] }
  ]
  return params;
}

const client = algoliasearch(algoliaAppId, algoliaApiKey, {
  requester: createFetchRequester(),
});
//const index = client.initIndex('instant_search');

type CategoryIndex = {
  [key: string]: string; // Add index signature
};

type FacetParams = {
  [key: string]: {
    'facetstring': string[];
    'arrayposition': number;
  }
};
type RouterConfig = {
  [key: string]: {
    name: string;
    tag?: string;
    facet?: string;
    facetValue?: string;
  };
};
type FLPs = {
  [key: string]: {
    urlName: string;
    facet: string;
    facetValue: string;
  };
};

//This comes from a CMS or other source
const routerConfig: RouterConfig = {
  'all': { name: 'All', },
  'radfahren': { name: 'Radfahren', tag: 'Radfahren'},
  'laufen': { name: 'Laufen', tag: 'Laufen'},
  'schwimmen' : { name: 'Schwimmen', tag: 'Schwimmen'},
  'triathlon' : { name: 'Triathlon', tag: 'Triathlon'},
  //'phones/apple' : { name: 'Cell Phones (Apple)', tag: 'phones', facet: 'brand', facetValue: 'Apple'},
  'fitness' : { name: 'Fitness', tag: 'Fitness'},
  'outdoor' : { name: 'Outdoor', tag: 'Outdoor'},
}

const flps: FLPs = {
  'phones' : { urlName: 'apple', facet: 'brand', facetValue: 'Apple' }
}
//This is only needed for the Demo, to create the basefilter
const mapCategoryToIndex: CategoryIndex = {
  appliances: 'Appliances',
  audio: 'Audio',
  cameras: 'Cameras & Camcorders',
  phones: 'Cell Phones',
  computers: 'Computers & Tablets',
  tv: 'TV & Home Theater',
};

const baseFilter = '';//Object.keys(mapCategoryToIndex).map((key) => `hierarchicalCategories.lvl0:'${mapCategoryToIndex[key]}'`).join(' OR ');

async function getProducts(category: string, query?: string, searchParams?: any) {
  const cat = category!=='all'? [`categoriesMenu.lvl0:${routerConfig[category].tag}`] : [];
  const ff: any[] = [];
  const facetParams: FacetParams = {};
  if(flps[category] && searchParams.slug.includes('f.'+flps[category].urlName)) {
    if(searchParams[flps[category].facet]) {
      if(typeof searchParams[flps[category].facet] === 'string') {
        searchParams[flps[category].facet] = [searchParams[flps[category].facet], flps[category].facetValue];
      }
    } else {
      searchParams[flps[category].facet] = flps[category].facetValue;
    }
  }
  const q = query && query.length > 3 ? query : '';
  const algoliaQueries = [
    {
      indexName: algoliaIndex,
      query: q,
      filters: baseFilter,
      params: {
        facets: ['*'],
        hitsPerPage: 30,
        facetFilters: [cat],
      },
    },
    {
      indexName: algoliaIndex,
      query: q,
      filters: baseFilter,
      params: {
        facets: ['categoriesMenu.lvl0'],
        hitsPerPage: 0,
        facetFilters: [],
      },
    },
  ];

  if (searchParams) {
    console.log("Search params: ", searchParams);
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] && key !== 'slug' && key !== 'query') {
        const fvalue: string[] = [];
        const iterator = typeof searchParams[key] === 'object' ? searchParams[key] : [searchParams[key]];
        iterator.forEach((element: string) => fvalue.push(`${decodeURIComponent(key)}:${decodeURIComponent(element)}`));

        facetParams[key] = { facetstring : fvalue, arrayposition: 0 };
        ff.push(fvalue);
      }
    });
  }
  Object.keys(facetParams).forEach((key) => {    
    const adjustedFacetValues = ff.filter((f) => !f.includes(facetParams[key].facetstring[0]))     
    facetParams[key].arrayposition = algoliaQueries.push({ 
    indexName: algoliaIndex, 
    query: q,
    filters: baseFilter, 
    params: 
      { facets: [key], 
        hitsPerPage: 0, 
        facetFilters: [cat, ...adjustedFacetValues],
      } }) - 1;
  })
  algoliaQueries[0].params.facetFilters = [...algoliaQueries[0].params.facetFilters, ...ff];
  algoliaQueries[1].params.facetFilters = [...algoliaQueries[1].params.facetFilters, ...ff]
  //console.log("Facet filters: ", algoliaQueries);

  const r : any = await client.multipleQueries(algoliaQueries);
  return { r, facetParams };
}

export default async function Page(
    { params, searchParams }: { 
      params: {  slug: string[] }, 
      searchParams?: any
    }) 
  {

  const category = params.slug ? params.slug.filter((s) => !s.match(/f\./)).join('/') : 'all';

  console.log("Page params: ", params, searchParams, category);
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const {r, facetParams} = await getProducts(category, query, searchParams);
  const results = r.results;
  //console.log("Results: ", results[0].hits);
    return (
      <div className="grid grid-cols-4 min-h-screen">
        <div className="grid-cols-1 h-full gap-4 p-6 pt-0 bg-gray-100/40 dark:bg-gray-800/40">
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Links facets={results[0]} catMap={routerConfig} speakingMenu={results[1]}/>
          </Suspense>
        </div>
        <div className="col-span-3 gap-4 p-6 pt-0 ">
          
          <div className='grid grid-cols-3 gap-1 p-1 pt-0 '>
            <div className="grid-cols-1 gap-4 pt-0 ">
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter 
                  facets={results[facetParams['manufacturerName']?.arrayposition || 0].facets['manufacturerName']}
                  name='Brands'
                  facetName='manufacturerName'
                  flps={flps[category]} />
              </Suspense>
            </div>
            <div className="col-span-1 gap-4  pt-0 " >
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter facets={results[facetParams['attributesWithKeyValue.usageBikeSport']?.arrayposition || 0].facets['attributesWithKeyValue.usageBikeSport']}
                  name ='Radsport Einsatzbereich'
                  facetName='attributesWithKeyValue.usageBikeSport' />
              </Suspense>
            </div>
            <div className="col-span-1 gap-4  pt-0 ">
              <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
                <MultiSelectFilter facets={results[facetParams['attributesWithKeyValue.color']?.arrayposition || 0].facets['attributesWithKeyValue.color']}
                  name ='Color'
                  facetName='attributesWithKeyValue.color'  />
              </Suspense>
            </div>
          </div>
          <h2 className="">Products: {routerConfig[category].name} {(query.length > 3)? '+ "'+ query +'"': ''}</h2>
          <Suspense fallback={<ProductsLoading />} >
            <Products hits={results[0].hits}/> 
          </Suspense>
        </div>
      </div>
    )
}