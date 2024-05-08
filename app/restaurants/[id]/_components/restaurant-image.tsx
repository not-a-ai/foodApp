"use client"

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

const RestaurantImage = ({restaurant}: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[215px] w-full">
      <Image fill src={restaurant?.imageUrl} alt={restaurant?.name} className="object-cover"/> 

      <Button 
      onClick={handleBackClick}
      className="absolute left-2 top-2 bg-white hover:text-white  text-black rounded-full" 
      size="icon" >
        <ChevronLeftIcon />
      </Button>
      <Button
            size="icon"
            className="absolute right-4 top-4 rounded-full bg-gray-700"
          >
            <HeartIcon className="fill-white" size={20} />
          </Button>
    </div>
    )
}
 
export default RestaurantImage;