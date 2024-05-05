import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrent } from "../_helpers/prices";
import { Button } from "./ui/button";

interface RestaurantItemProps {
  restaurant: Restaurant
}

const RestaurantItem = ({restaurant}: RestaurantItemProps) => {
  return (
    <div className="min-w-[266px] max-w-[266px] space-y-3" >
      <div className="w-full h-[136px] relative">
        <Image 
        src={restaurant.imageUrl} 
        fill className="object-cover rounded-lg" 
        alt={restaurant.name}
        />
        <div className="absolute left-2 gap-[2px] top-2 py-[2px] px-2 bg-white rounded-full  flex items-center">
          <StarIcon className="fill-yellow-500 text-yellow-500" size={12}/>
          <span className="font-semibold text-xs">5,0</span>
        </div>

        <Button 
        size="icon"
        className="absolute right-2 top-2 bg-gray-700 rounded-full h-7 w-7">
          <HeartIcon className="fill-white" size={16}/>
        </Button>
      </div>
      <div>
        <h3 className="font-semibold text-sm">{restaurant.name}</h3>
        <div className="flex gap-3 text-sx items-center">
          <div className="flex gap-1">
            <BikeIcon className="text-red-700" size={14} />
            <span className="text-xs text-muted-foreground ">
              {
                Number(restaurant.deliveryFee) === 0
                ? "Entrega grátis"
                : formatCurrent(Number(restaurant.deliveryFee))
              }
            </span> 
          </div>
          <div className="flex gap-1">
            <TimerIcon className="text-red-700" size={14} />
            <span className="text-xs text-muted-foreground ">
              {restaurant.deliveryTimeMinutes} min
            </span> 
          </div>
        </div>
      </div>
    </div>
  )
    
}
 
export default RestaurantItem;