import { useEffect, useState } from "react";

interface Product {
  product_id: number;
  product_name: string;
  category_id: number;
  detail: string;
  category_name: string;
}

interface Category {
  value: number;
  label: string;
}

const useProductData = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ดึงข้อมูลสินค้า
        const productRes = await fetch(`/api/products/${productId}`);
        const productData = await productRes.json();
        
        // ดึงข้อมูล Categories
        const categoryRes = await fetch("/api/categories");
        const categoryData = await categoryRes.json();

        if (productData.success) setProduct(productData.product);
        if (categoryData.success) setCategories(categoryData.categories);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { product, categories, loading };
};

export default useProductData;
