'use client'
 
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
 
export function Links() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('query');
  const links = [
    {url: '/shop', name: 'All Products'},
    {url: '/shop/appliances', name: 'Appliances (Static)'},
    {url: '/shop/audio', name: 'Audio (Static)'},
    {url: '/shop/cameras', name: 'Cameras & Acccessories'},
    {url: '/shop/phones', name: 'Cell Phones'},
    {url: '/shop/computers', name: 'Computers & Tablets'},
    {url: '/shop/tv', name: 'TV & Home Theater'},
    ]
 
  return (

    <nav className="flex-1 overflow-auto py-2">
      {
          links.map((link: any) => (
            <Link
            className={`link ${pathname === link.url ? 'bg-gray-100 text-gray-900 dark:text-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 '} block rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50`}
            href={query ? link.url + '?query=' + query : link.url}
            key={link.url}
            >
            {link.name}
            </Link>
          ))
      }
    </nav>
  )
}