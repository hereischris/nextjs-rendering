import { Suspense } from 'react'
import Products from '@/components/products';
import { Skeleton } from "@/components/ui/skeleton";
import { Links } from "@/components/links"

export function generateStaticParams() {
  const params = [
    { slug: ['appliances'] }, { slug: ['audio'] }
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
      <div className="grid grid-cols-4 min-h-screen">
        <div className="grid-cols-1 h-full gap-4 p-6 pt-0 bg-gray-100/40 dark:bg-gray-800/40">
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Links />
          </Suspense>
        </div>
        <div className="col-span-3 h-full gap-4 p-6 pt-0 ">
          <h2 className="mt-5">Products: {params.slug} {(query.length > 2)? '+ "'+ query +'"': ''}</h2>
          <Suspense fallback={<Skeleton className="w-[100px] h-[20px] rounded-full" />}>
            <Products category={category} query={query} /> 
          </Suspense>
        </div>
      </div>
    )
}