import React, { useEffect, useState } from 'react'
import useGetSearchedProducts from '../hooks/products/getSearchedProduct';
import Link from 'next/link';

const SearchPage = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { loading, getProducts } = useGetSearchedProducts()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(searchQuery, page);
        if (response[0]) {
          if(response[1].length === 0) {
            setHasMore(false)
          }
          setProducts([...products, ...response[1]]);
          console.log([...products, ...response[1]]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log("Issue fetching Products: ", error);
        setHasMore(false);
      }
    }
    !loading && hasMore && fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 20 >=
      document.documentElement.offsetHeight && hasMore) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (hasMore) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);


  return (
    (!hasMore && products.length === 0)
      ?
      <div className='mt-4 font-bold text-center text-black'>
        No such product found
      </div>
      :
      <div className="mx-6 mt-3 mb-16 900px:mb-0">
        <div className="product-grid">
          {
            products.map((product, indx) => (
              <Link href={`/product/${product._id}`} key={indx} className="flex flex-col showcase">
                <div className="my-auto showcase-banner">
                  <img
                    src={product.image[0]?.url}
                    alt={product.productName}
                    width={300}
                    className="product-img default"
                  />
                  <img
                    src={product.image[1]?.url}
                    alt={product.productName}
                    width={300}
                    className="product-img hover"
                  />
                  <p className="showcase-badge">{product.discount + '%'}</p>
                </div>
                <div className="mt-auto showcase-content">
                  <div className="showcase-category">
                    {product.category?.toUpperCase()}
                    <h3 className="showcase-title">
                      {product.productName}
                    </h3>
                  </div>
                  <div className="price-box">
                    <p className="price">₹{product.price - Math.round((Number(product.discount) * Number(product.price) / 100))}</p>
                    <del> ₹{product.price}</del>
                  </div>
                </div>
              </Link>
            ))
          }
        </div>
        {
          !hasMore && <div className='my-4 font-bold text-center text-black'>
            No more matching products
          </div>
        }
        {
          loading && <div className='my-4 font-bold text-center text-black'>
            Fetching More Products ...
          </div>
        }
      </div>
  )
}

export default SearchPage