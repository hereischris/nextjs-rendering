export function generateStaticParams() {
  return [{ slug: ['a', '1'] }, { slug: ['b', '2'] }, { slug: ['c', '3'] }]
}

export default function Page({ params }: { params: {  slug: string[] } }) {
    return <div>My Page: {params.slug}</div>
}