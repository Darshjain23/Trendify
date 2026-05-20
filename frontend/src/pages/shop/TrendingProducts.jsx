import { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  const {
    data: { products = [] } = {},
  } = useFetchAllProductsQuery({
  });

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, incidunt
        quam harum sapiente, possimus ipsum eius praesentium, saepe cupiditate
        quod quidem. Asperiores, soluta ipsa. Ea nulla consequuntur adipisci non
        quidem?
      </p>

      <div className="mt-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      <div className="product__btn">
        {visibleProducts < products?.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
