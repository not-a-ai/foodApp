import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/ui/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0
      }
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        }
      },
    }
  })
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-6">
        <Image src="/banner-promo01.png" alt="até 30% de desconto em pizza" width={0} height={0} className="w-full h-auto object-contain" sizes="100vw"
      quality={100}/>
      </div>
      <div className="space-y-4 pt-6">
        <div className="px-5 justify-between flex items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-red-700 p-0 hover:bg-transparent h-fit">Ver todos
          <ChevronRightIcon size={16}/>
          </Button>
        </div>
        
        <ProductList products={products}/>
      </div>

      
    </>
  );
}

export default Home;
