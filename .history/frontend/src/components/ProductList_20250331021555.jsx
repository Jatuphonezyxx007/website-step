import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Input,
  Pagination,
} from "@nextui-org/react";
import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:3000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories || []))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCardClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    setCurrentPage(1); // รีเซ็ตหน้าไปที่ 1 เมื่อมีการเปลี่ยนหมวดหมู่
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name ?? "";
    const matchesSearch = productName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_name);
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category_id.toString());

    return matchesSearch && matchesCategory;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="product-list-container">
      <div
        className={`filter-sidebar ${
          window.innerWidth > 1024
            ? "expanded"
            : isOpen
            ? "expanded"
            : "collapsed"
        }`}
      >
        {window.innerWidth <= 1024 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="toggle-btn flex items-center justify-between w-full px-4 py-2 border rounded"
          >
            <span>Filter Products</span>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 18.75 7.5-7.5 7.5 7.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 7.5-7.5 7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
                />
              </svg>
            )}
          </button>
        )}

        {(isOpen || window.innerWidth > 1024) && (
          <form>
            <br />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                หมวดหมู่สินค้า
              </label>
              <CheckboxGroup
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="flex flex-col space-y-2"
              >
                {categories.map((category) => (
                  <Checkbox
                    key={category.value}
                    value={category.value.toString()}
                    className="flex items-center"
                  >
                    {category.label}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </form>
        )}
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        <h1 className="text-2xl font-bold mb-4">
          {categories.length > 0 ? categories[0].name : "ไม่มีหมวดหมู่"}
        </h1>

        <div className="grid-container">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <Card
                key={`product-${index}-${product.product_id}`}
                isPressable
                shadow="sm"
                onPress={() => handleCardClick(product.product_id)}
                className="product-card"
              >
                <CardBody className="overflow-hidden p-0">
                  <Image
                    isZoomed
                    alt={product.product_name}
                    className="product-image"
                    src={
                      `http://localhost:3000/products/${product.main_image}` ||
                      "https://via.placeholder.com/500x500"
                    }
                    width="100%"
                    height="100%"
                    radius="lg"
                  />
                </CardBody>
                <CardFooter className="text-small p-4 flex flex-col items-center justify-between">
                  <div className="product-details text-center">
                    <h2 className="product-name">{product.product_name}</h2>
                    <p className="product-category">{product.category_name}</p>
                  </div>
                  <div className="product-status mt-2">
                    {/* <p className={`status-badge ${product.status === "in_stock" ? "in-stock" : "out-of-stock"}`}>
                      {product.status === "in_stock" ? "In Stock" : "Out of Stock"}
                    </p> */}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>ไม่มีสินค้าในขณะนี้</p>
          )}
        </div>

        {/* Pagination */}
        <br></br>
        <div className="pagination-container mt-4 flex justify-center">
          <Pagination
            showControls
            initialPage={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
