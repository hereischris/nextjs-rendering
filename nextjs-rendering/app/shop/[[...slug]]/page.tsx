import { Suspense } from 'react'
import Products from '@/components/products';


export function generateStaticParams() {
  const params = [
    { slug: ['healthfitness'] }, { slug: ['electronics'] }
  ]
  return params;
}



export default function Page({ params }: { params: {  slug: string[] } }) {
 // console.log("Page params: ", params);
  const category = params.slug;

    return (
      <div><div>My Page: {params.slug}</div>
        <Suspense fallback={<p>Loading data...</p>}>
          <Products category={category} /> 
        </Suspense>
      </div>
    )
}