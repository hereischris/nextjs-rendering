export function generateStaticParams() {
  return [{ slug: ['clothing'] }, { slug: ['electronics'] }]
}

export default function Page({ params }: { params: {  slug: string[] } }) {
    return <div>My Page: {params.slug}</div>
}