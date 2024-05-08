import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";


interface CategoriesPageProps {
  params: {
    id: string
  }
}

const CategoriesPage = async ({params: { id }}: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id
    },
    include: {
      Product: {
        include: {
          restaurant: {
            select: {
              name:true
            }
          }
        }
      }
    }
  })

  if (!category) return notFound()

  return ( 
  <>
    <Header />
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-6">Restaurantes Recomendados</h2>
      <div className="grid grid-cols-2 gap-6 ">
        {category.Product.map((product) => (
          <ProductItem
              className="min-w-full "
              key={product.id}
              product={product}
            />
        ))}
      </div>
    </div>
  </> 
);
}
 
export default CategoriesPage;