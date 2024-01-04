'use client'
 
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
 
export function Links(props: any) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const speakingMenu = props?.speakingMenu.facets || {};
  const menuItemsAvailable = speakingMenu['hierarchicalCategories.lvl0'] || {};
  const catMap = props?.catMap;
  //const query = searchParams.get('query');
  //This is a menu config from a CMS
  const links = [
    {url: '/shop', name: 'All Products', tag: ''},
    {url: '/shop/appliances', name: 'Appliances (Static)', tag: 'appliances'},
    {url: '/shop/audio', name: 'Audio (Static)', tag: 'audio'},
    {url: '/shop/cameras', name: 'Cameras & Acccessories', tag: 'cameras'},
    {url: '/shop/phones', name: 'Cell Phones', tag: 'phones'},
    {url: '/shop/computers', name: 'Computers & Tablets', tag: 'computers'},
    {url: '/shop/tv', name: 'TV & Home Theater', tag: 'tv'},
    ]
  //console.log("menuitems av", props.catMap);
  return (
    <nav className="flex-1 overflow-auto py-2">
      {
          links.map((link: any) => {
            let active = true;
            if(link.tag !== 'all' && catMap[link.tag] && !Object.hasOwn(menuItemsAvailable, catMap[link.tag].tag) ) active = false;

            return (
            <Link
            className={`link ${pathname === link.url ? 'bg-gray-100 text-gray-900 dark:text-gray-50 dark:bg-gray-800' : ''} 
                      block rounded-lg px-3 py-2 transition-all hover:text-gray-900 dark:hover:text-gray-50
                      ${!active ? `pointer-events-none text-slate-800` : 'text-gray-500 dark:text-gray-400'}`}
            href={searchParams ? link.url + `?${searchParams.toString()}` : link.url}
            key={link.url}

            >
            {link.name}
            </Link>
          )})
      }
    </nav>
  )
}