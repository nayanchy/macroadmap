import SingleProduct from "@/components/SingleProduct";
import { getProductById } from "@/constants/data";

type Props = { params: Promise<{ id: string }> };

const SingleProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-84px)]">
      <SingleProduct
        id={Number(product.id)}
        img={product.img}
        name={product.name}
        price={product.price}
        rating={product.rating}
        desc={product.desc}
      />
    </div>
  );
};

export default SingleProductPage;
