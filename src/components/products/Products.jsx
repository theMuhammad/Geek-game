import { useEffect, useState } from "react";
import api from "../../api/products.js";
import axios from "axios";

import Mahsulot from "./Mahsulot.jsx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/productsSlice.js";
import { Link } from "react-router-dom";

import { GiCheckMark } from "react-icons/gi";

const Products = ({ search, setSearch, setShowSearch }) => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [sortedPrice, setSortedPrice] = useState("");
  const [showPagination, setShowPagination] = useState(true);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 9;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseBrands = await api.get("/brands");
        setBrands(responseBrands.data);

        const responseColors = await api.get("/colors");
        setColors(responseColors.data);

        const productsCountResponse = await api.get("/products");
        const productsCount = productsCountResponse.data.length;
        const pagesCount = Math.ceil(productsCount / pageCount);
        const pages = new Array(pagesCount).fill().map((_, i) => i + 1);
        setTotalPages(pages);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchProducts = async () => {
      let query = "/products";
      const params = [];

      if (selectedBrand) params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      if (selectedColor) params.push(`color_options_like=${encodeURIComponent(selectedColor)}`);
      if (sortedPrice) params.push(`_sort=price&_order=${encodeURIComponent(sortedPrice)}&_limit=${pageCount}&_page=${currentPage}`);

      if (params.length > 0) {
        query += `?${params.join("&")}`;
        setShowPagination(false);
      } else {
        query += `?_limit=${pageCount}&_page=${currentPage}`;
        setShowPagination(true);
      }

      setError(null);
      setIsLoading(true);

      try {
        const response = await api.get(query, { signal });
        dispatch(setProducts(response.data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled", error.message);
        } else {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => controller.abort();
  }, [selectedBrand, selectedColor, sortedPrice, currentPage]);

  const clearFilters = () => {
    setSelectedBrand("");
    setSelectedColor("");
    setSortedPrice("");
  };

  return (
    <div className="bg-white">
      <section className="pt-[127px] pb-[95px] bg-cover bg-no-repeat bg-center bg-[url('/hero.png')]">
        <div className="container">
          <div className="px-[115px]">
            <h2 className="hero_text w-[530px] mb-[23px]">START YOUR GAME WITH THE BEST</h2>
            <p className="font-readexPro text-white text-[18px] leading-[23px] opacity-80 mb-[40px]">
              We've Got Everything
              <span className="block">You Need for Gaming Supremacy</span>
            </p>
            <button className="py-[17px] px-[120px] transition-all duration-300 bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-lightGreen hover:text-[#2c2c2c] mb-[30px]">
              <Link to="/products">Shop</Link>
            </button>
            <ul className="flex flex-col gap-[20px]">
              <li className="flex">
                <GiCheckMark className="text-white text-[22px] mr-[25px]" />
                <p className="font-hammersmithOne text-[22px] leading-[28px] text-white w-[300px]">
                  MORE THAN <span className="text-green">15+</span> POPULAR PROFESSIONAL
                  <span className="text-green block"> BRANDS</span>
                </p>
              </li>
              <li className="flex">
                <GiCheckMark className="text-white text-[22px] mr-[25px]" />
                <p className="font-hammersmithOne text-[22px] leading-[28px] text-white w-[300px]">
                  <span className="text-green">2500+</span> ITEMS
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="container bg-slimGreen py-[20px] mb-[65px]">
        <div className="flex justify-between items-center">
          <p className="font-hammersmithOne text-[24px] leading-[30px] capitalize text-lightGreen">Filter by:</p>
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <p tabIndex={0} className="flex items-center gap-[6px] font-hammersmithOne text-[24px] leading-[30px] cursor-pointer capitalize text-green">
              <MdKeyboardArrowDown />
              Sort by
            </p>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-36 p-2 shadow">
              <li>
                <a>Price</a>
              </li>
              <li>
                <a>Rating</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container mb-[100px] grid grid-cols-[270px_1fr] gap-[55px]">
        <aside>
          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">BRAND</div>
              <div className="collapse-content px-0">
                <ul className="flex flex-col gap-[21px] mt-[4px]">
                  {brands.map((brand, index) => (
                    <li key={index} className="flex gap-[18px]">
                      <input
                        className="checkbox checkbox-success"
                        type="radio"
                        value={brand}
                        name="brand"
                        id={brand}
                        checked={brand === selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      />
                      <label className="cursor-pointer font-readexPro text-[18px] font-light leading-[23px]" htmlFor={brand}>
                        {brand}
                      </label>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedBrand("")}
                  className="w-full py-[12px] bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">COLORS</div>
              <div className="collapse-content px-0 w-[175px]">
                <ul className="grid grid-cols-6 gap-[11px]">
                  {colors.map((color, index) => (
                    <li key={index}>
                      <div
                        style={{
                          background: color,
                          outline: selectedColor === color ? "3px solid red" : "",
                        }}
                        className="w-5 h-5 rounded-full border-[1px] border-black"
                        onClick={() => setSelectedColor(color)}
                      />
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedColor("")}
                  className="w-full py-[12px] bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-b-2 border-dashed border-#454444CC pt-[14px] pb-[8px]">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-[20px] leading-[25px] text-darkGreen font-bold px-0">SORT BY PRICE</div>
              <div className="collapse-content px-0 w-full">
                <ul>
                  <li className="flex items-center gap-[16px] mb-[20px]">
                    <input
                      className="checkbox checkbox-success"
                      type="radio"
                      value="asc"
                      name="price"
                      id="upgradePrice"
                      checked={sortedPrice === "asc"}
                      onChange={(e) => setSortedPrice(e.target.value)}
                    />
                    <label className="font-bold text-[19px] leading-[24px] mb-[6px]" htmlFor="upgradePrice">
                      Qimmat
                    </label>
                  </li>
                  <li className="flex items-center gap-[16px]">
                    <input
                      className="checkbox checkbox-success"
                      type="radio"
                      value="desc"
                      name="price"
                      id="downgradePrice"
                      checked={sortedPrice === "desc"}
                      onChange={(e) => setSortedPrice(e.target.value)}
                    />
                    <label className="font-bold text-[19px] leading-[24px]" htmlFor="downgradePrice">
                      Arzon
                    </label>
                  </li>
                </ul>
                <button
                  onClick={() => setSortedPrice("")}
                  className="w-full py-[12px] bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[30px]"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <button
            className="w-full py-[12px] bg-green rounded-[10px] font-inter font-bold text-[22px] leading-[27px] text-white hover:bg-slimGreen hover:text-darkGreen transition mt-[80px]"
            onClick={clearFilters}
          >
            Clear All
          </button>
        </aside>

        <main>
          <Mahsulot
            products={products}
            onLoad={isLoading}
            error={error}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            showPagination={showPagination}
            searchResults={searchResults}
            setSearch={setSearch}
            setShowSearch={setShowSearch}
          />
        </main>
      </div>
    </div>
  );
};

export default Products;
