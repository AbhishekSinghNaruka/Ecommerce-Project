import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Pagination from 'react-js-pagination';
import {useParams} from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {getProducts} from '../actions/productActions';
import Product from './Product';
import Loader from './Loader';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = ()=> {
  let params=useParams();
  const keyword=params.keyword;

  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([1,100000]);
  const [category,setCategory] = useState('');
  const [rating,setRating] =useState(0);
  const categories=[
    "Electronics",
    "Food",
    "Laptops",
    "Accessories",
    "Headphones",
    "Books",
    "Clothing",
    "Cameras",
    "Beauty",
    "Sports"
  ];

  const alert = useAlert();
  const dispatch=useDispatch();
  const {loading,error,products,productCount,resPerPage,filteredProductsCount} = useSelector(state => state.product);

  useEffect(() =>{
    if(error)
      return alert.error(error);

    dispatch(getProducts(keyword,currentPage,price,category,rating));
  },[dispatch,error,currentPage,keyword,price,category,rating]);

  const setCurrentPageNo = (pageNumber) =>{
    setCurrentPage(pageNumber);
  };

  let count=productCount;
  if(keyword)
    count=filteredProductsCount;

  return (
    <React.Fragment>
      {loading ? <Loader /> : (
        <React.Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <React.Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1:`Rs 1`,
                          1000:`Rs 1000`
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={value => `${value}`}
                        tipProps={{
                          palcement:"top",
                          visible:true
                        }}
                        value={price}
                        onChange={price => setPrice(price)}
                      />

                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">
                          categories
                        </h4>
                        <ul className="pl-0">
                          {categories.map(category => (
                            <li
                              style={{
                                cursor:'pointer',
                                listStyleType:'none'
                              }}
                              key={category}
                              onClick={()=> setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <hr className="my-3" />
                      <div className="mt-5">
                        <h4 className="mb-3">
                          Ratings
                        </h4>
                        <ul className="pl-0">
                          {[5,4,3,2,1].map(star => (
                            <li
                              style={{
                                cursor:'pointer',
                                listStyleType:'none'
                              }}
                              key={star}
                              onClick={()=> setRating(star)}
                            >
                              <div className="rating-outer">
                                <div className="rating-inner"
                                  style={{
                                    width:`${star*20}%`
                                  }}
                                >

                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="container-fluid">
                      <div className="row">
                        {products && products.map(product => (
                          <Product Key={product._id} product={product} col={4}/>
                        ))}
                      </div>
                    </div>
                  </div>

                </React.Fragment>
              ):(
                products && products.map(product => (
                  <Product Key={product._id} product={product} col={3}/>
                ))
              )}


            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            {resPerPage<= count && (
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClasses="page-item"
                linkClass="page-link"
              />
            )}



          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};


export default Home;
