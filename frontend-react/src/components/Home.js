import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useAlert} from 'react-alert';
import Pagination from 'react-js-pagination';

import {getProducts} from '../actions/productActions';
import Product from './Product';
import Loader from './Loader';


const Home = ()=> {

  const [currentPage,setCurrentPage] = useState(1);

  const alert = useAlert();
  const dispatch=useDispatch();
  const {loading,error,products,productCount,resPerPage} = useSelector(state => state.product);

  useEffect(() =>{
    if(error)
      return alert.error(error);

    dispatch(getProducts(currentPage));
  },[dispatch,error,currentPage]);

  const setCurrentPageNo = (pageNumber) =>{
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      {loading ? <Loader /> : (
        <React.Fragment>
          <h1 id="products_heading">Latest Products</h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
                <Product Key={product._id} product={product} />
              ))}

            </div>
          </section>
          <div className="d-flex justify-content-center mt-5">
            {resPerPage< productCount && (
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
