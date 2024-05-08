import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrent } from "../_helpers/prices";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <Link
      className="min-w-[266px] max-w-[266px]"
      href={`/restaurants/${restaurant.id}`}
    >
      <div className="w-full space-y-3">
        <div className="relative h-[136px] w-full">
          <Image
            src={restaurant.imageUrl}
            fill
            className="rounded-lg object-cover"
            alt={restaurant.name}
          />
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-white  px-2 py-[2px]">
            <StarIcon className="fill-yellow-500 text-yellow-500" size={12} />
            <span className="text-xs font-semibold">5,0</span>
          </div>

          <Button
            size="icon"
            className="absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700"
          >
            <HeartIcon className="fill-white" size={16} />
          </Button>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{restaurant.name}</h3>
          <div className="text-sx flex items-center gap-3">
            <div className="flex gap-1">
              <BikeIcon className="text-red-700" size={14} />
              <span className="text-xs text-muted-foreground ">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : formatCurrent(Number(restaurant.deliveryFee))}
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
    </Link>
  );
};

export default RestaurantItem;
