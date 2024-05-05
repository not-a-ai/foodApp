import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/products-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";

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
      <PromoBanner 
        src="/banner-promo01.png" 
        alt="até 30% de desconto em pizza" />
      <div className="space-y-4 pt-6">
        <div className="px-5 justify-between flex items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-red-700 p-0 hover:bg-transparent h-fit">Ver todos
          <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductList products={products}/>
      </div>
      <PromoBanner 
        src="/banner-promo02.png" 
        alt="apartir de R$17,90 em lanches" />
      <div className="space-y-4 py-6">
        <div className="px-5 justify-between flex items-center">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button variant="ghost" className="text-red-700 p-0 hover:bg-transparent h-fit">Ver todos
          <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <RestaurantList />
      </div>
      
      

      
    </>
  );
}

export default Home;
