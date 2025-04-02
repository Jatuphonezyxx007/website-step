import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageMeta from "../../components/common/PageMeta";
import Card from "../../components/common/Card";
import "./home.css";

interface HomeProps {
  searchQuery: string;
}

export default function Home({ searchQuery }: HomeProps) {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = searchQuery.trim()
          ? `http://localhost:3000/api/products/search?query=${searchQuery}`
          : `http://localhost:3000/api/products`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success) {
          setAllProducts(data.products);
        } else {
          setAllProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageMeta title="Step Solution" description="" />

      <div className="grid grid-cols-12 gap-3 md:gap-6 items-stretch mt-4 rounded-2xl">
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <div
              key={`${product.product_id}-${index}`}
              className="col-span-12 md:col-span-3 cursor-pointer"
              onClick={() => navigate(`/edit-product/${product.product_id}`)}
            >
              <Card
                title={product.product_name}
                image={
                  product.main_image
                    ? `http://localhost:3000/products/${product.main_image}`
                    : undefined
                }
              />
            </div>
          ))
        ) : (
          <p className="col-span-12 text-center text-gray-500">
            ไม่พบสินค้าตามคำค้นหา
          </p>
        )}
      </div>

      {allProducts.length > itemsPerPage && (
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-arrow"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`pagination-item ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-arrow"
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
}
