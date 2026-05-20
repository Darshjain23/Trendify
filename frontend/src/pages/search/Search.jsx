import { useState, useEffect } from "react";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [filteredProducts, setFilteredProducts] = useState([]);

    const {
        data: { products = [] } = {},
    } = useFetchAllProductsQuery({});

    // Helper function to perform filtration
    const filterProducts = (queryText) => {
        const query = queryText.toLowerCase().trim();
        if (!query) {
            setFilteredProducts([]);
            return;
        }
        const filtered = products?.filter(
            (product) =>
                product?.name.toLowerCase().includes(query) ||
                product?.description.toLowerCase().includes(query)
        );
        setFilteredProducts(filtered);
    };

    // Sync input when products list loads or searchQuery changes
    useEffect(() => {
        if (products?.length > 0) {
            filterProducts(searchQuery);
        }
    }, [searchQuery, products]);

    // Keep input synced if URL search params change externally
    useEffect(() => {
        const queryParam = searchParams.get("query") || "";
        if (queryParam !== searchQuery) {
            setSearchQuery(queryParam);
        }
    }, [searchParams]);

    const handleSearchChange = (val) => {
        setSearchQuery(val);
        setSearchParams(val ? { query: val } : {});
    };

    return (
        <>
            <section className="section__container bg-primary-light">
                <h2 className="section__header capitalize">Search Products</h2>
                <p className="section__subheader">
                    Browse and filter through our extensive catalog of high-quality products instantly.
                </p>
            </section>

            <section className="section__container">
                <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="search-bar w-full max-w-4xl p-2 border rounded"
                        placeholder="Search for products..."
                    />
                </div>

                <ProductCards products={filteredProducts} />
            </section>
        </>
    );
};

export default Search;
