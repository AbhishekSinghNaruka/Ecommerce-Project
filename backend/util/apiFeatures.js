//jshint esversion:9
// not needed directly implemented in getProducts
class APIFeatures{
  constructor(query,queryString){
    this.query=query;
    this.queryString=queryString;
  }

  search(){
    //console.log(this.query);
    const keyword=this.queryString.keyword ? {
      name:{
        $regex:this.queryString.keyword,
        $options:'i'
      }
    }:{};
    this.query=this.query.find({ ...keyword });
    return this;
  }

  filter(){
    const queryCopy = {...this.queryString};
    const feildsToRemove = ['keyword','limit','page'];
    feildsToRemove.forEach( feild => delete queryCopy[feild] );

    let queryStr = JSON.stringify(queryCopy);
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match =>  `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resPerPage){
    const currentPage = this.queryString.page || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports=APIFeatures;
