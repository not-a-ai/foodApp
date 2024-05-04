import { db } from "../_lib/prisma";
import CategoryItem from "./ui/category-item";

const CategoryList = async () => {
  const categorias = await db.category.findMany({});
  
  return (
    <div className="flex overflow-x-scroll gap-3">
      {categorias.map((category) => (
      <CategoryItem key={category.id} category={category}/>
      ))}
    </div>
  );
}
 
export default CategoryList;