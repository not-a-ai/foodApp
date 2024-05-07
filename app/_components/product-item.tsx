"use client"
import { calculateProductTotalPrice, formatCurrent } from "@/app/_helpers/prices";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        }
      }
    }
  }>
}

const ProductItem = ({product}: ProductItemProps) => {
  return ( 
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
      <div className="h-[150px] w-full relative min-w-[150px]">
      <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md"/>

      {product.discountPercentage && (
        <div className="absolute left-2 gap-[2px] top-2 bg-red-700 py-[2px] px-2 rounded-full text-white flex items-center">
          <ArrowDownIcon  size={12}/>
          <span className="font-semibold text-xs">{product.discountPercentage}%</span>
        </div>
      )}
    </div>
    <div >
      <h2 className="text-sm truncate">{product.name}</h2>
      <div className="flex gap-1 items-center">
        <h3 className="font-semibold">{formatCurrent(calculateProductTotalPrice(product))}
        </h3>
        {product.discountPercentage > 0 && (
          <span className="line-through text-muted-foreground text-xs">{formatCurrent(Number(product.price))}</span>
        )}
      </div>
        <span className="text-muted-foreground text-xs block">{product.restaurant.name}</span>
    </div>
    </Link>
   );
}
 
export default ProductItem;