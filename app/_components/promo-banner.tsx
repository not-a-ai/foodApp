import Image, { ImageProps } from "next/image";



const PromoBanner = (props: ImageProps) => {
  return ( 
  <div className="px-5 pt-6">
    <Image
     width={0} height={0} 
     className="w-full h-auto object-contain" 
     sizes="100vw"
    quality={100}
    {...props}/>
  </div> 
);
}
 
export default PromoBanner;