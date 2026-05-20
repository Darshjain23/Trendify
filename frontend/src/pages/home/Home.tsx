import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Blogs from "../blogs/Blogs";
import TrendingProducts from "../shop/TrendingProducts";
import Banner from "./Banner";
import Categories from "./Categories";
import DealsSection from "./DealsSection";
import PromoBanner from "./PromoBanner";
import StyleSection from "./StyleSection";

const Home = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const scrollTarget = searchParams.get("scroll");
    if (scrollTarget) {
      // Small timeout to allow component rendering before scroll calculation
      const timer = setTimeout(() => {
        if (scrollTarget === "footer") {
          const footer = document.querySelector("footer");
          footer?.scrollIntoView({ behavior: "smooth" });
        } else {
          const element = document.getElementById(scrollTarget);
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <>
      <Banner />
      <div id="categories">
        <Categories />
      </div>
      <StyleSection />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <div id="blogs">
        <Blogs />
      </div>
    </>
  );
};

export default Home;
