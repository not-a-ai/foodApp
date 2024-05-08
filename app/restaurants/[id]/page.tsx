import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/products-list";

interface RestaurantPageProps {
  params: {
    id: string;
  };
}

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc"
        },
        include: {
          Product: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          }
        },
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  console.log(restaurant)
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="flex items-center justify-between px-5 pt-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white">
        <div className="flex items-center gap-1">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="flex items-center gap-[3px] rounded-full bg-foreground  px-2 py-[2px]">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
          <span className="text-xs font-semibold text-white">5,0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="px mt-3 min-w-[167px] rounded-lg bg-[#F4F4F4] px-5 text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="px-5 font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.Product} />
        </div>
      ))}
    </div>
  );
};

export default RestaurantPage;
