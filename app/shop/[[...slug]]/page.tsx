import { Suspense } from 'react'
import Products from '@/components/products';
import { Searchbar } from '@/components/searchbar';
import { Skeleton } from "@/components/ui/skeleton";


export function generateStaticParams() {
  const params = [
    { slug: ['healthfitness'] }, { slug: ['electronics'] }
  ]
  return params;
}



export default function Page(
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

    return (
      <div>
        <div>
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Searchbar placeholder='Search'/>
          </Suspense>
        </div>
        <div>Products: {params.slug} {(query.length > 2)? '+ "'+ query +'"': ''}</div>

        <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
          <Products category={category} query={query} /> 
        </Suspense>
      </div>
    )
}