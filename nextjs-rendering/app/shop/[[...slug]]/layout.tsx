
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Links } from "@/components/links"

export default function StaticLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[240px_1fr]">
          <div className="hidden lg:block bg-gray-100/40 dark:bg-gray-800/40">
            <div className="flex flex-col gap-4 p-6">
              <div className="h-[60px] flex items-center gap-2">
                <Link className="font-semibold" href="#">
                  <MountainIcon className="h-6 w-6" />
                  <span className="">Acme Store</span>
                </Link>
                <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                  <ShoppingCartIcon className="h-4 w-4" />
                  <span className="sr-only">Shopping Cart</span>
                </Button>
              </div>
              <Links />
            </div>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
          </div>
        </div>
      )
  }



function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function ShoppingCartIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  )
}
