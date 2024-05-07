"use client"

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PropductImageProps {
  product: Pick<Product, 'name' | 'imageUrl'>
}

const ProductImage = ({product}: PropductImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[360px] w-full">
      <Image fill src={product?.imageUrl} alt={product?.name} className="object-cover"/> 

      <Button 
      onClick={handleBackClick}
      className="absolute left-2 top-2 bg-white hover:text-white  text-black rounded-full" 
      size="icon" >
        <ChevronLeftIcon />
      </Button>
    </div>
    )
}
 
export default ProductImage;