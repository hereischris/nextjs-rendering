'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Links() {
  const pathname = usePathname()
  const links = [
    {url: '/shop', name: 'Home'},
    {url: '/shop/clothing', name: 'Clothing'},
    {url: '/shop/electronics', name: 'Electronics'},
    {url: '/shop/accessories', name: 'Accessories'},
    ]
 
  return (
    <nav className="flex-1 overflow-auto py-2">
    {
        links.map((link: any) => (
          <Link
          className={`link ${pathname === link.url ? 'bg-gray-100 text-gray-900 dark:text-gray-50 dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400 '} block rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50`}
          href={link.url}
          >
          {link.name}
          </Link>
        ))
    }
    </nav>
  )
}