import {productsModel} from "../models/products.model.js"
class ProductsManager {
    async findAll(obj) {
      const { limit = 10, page = 1, order = "def", ...query } = obj;
  
      let sort
      if (order== "asc"){
        sort = 'price'
      }else if (order== "des"){
        sort = '-price'
      }else if(order == "def"){
        sort = {}
      }
  
      const options =  {
        page: page,
        limit: limit,
        sort
      }
  
      const response = await productsModel.paginate(query, options);
      /* console.log(response) */
      const info = {
        status: response.docs ? "success" : "error",
        count: response.totalDocs,
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,      
        nextLink: response.hasNextPage
          ? `http://localhost:8080/api/products?page=${response.nextPage}`
          : null,
        prevLink: response.hasPrevPage
          ? `http://localhost:8080/api/products?page=${response.prevPage}`
          : null,
      };
      const payload = response.docs;
      return { info, payload, page, limit, order, query };
    }

    async getProducts(limit, page, filtro){
      try {
          let products = await productsModel.paginate(filtro, {limit: 10, page: page, lean: true})
          // console.log(products)
          if (!limit) {
              return products
          }
          return products = await productsModel.paginate(filtro, {limit: limit, page: page, lean: true})
      } catch (error) {
          console.log(error)
      }
  }
  
  
    async createOne(obj) {
      const result = await productsModel.create(obj);
      return result;
    }
  
    async findById(id) {
      const result = await productsModel.findById(id);
      return result;
    }  
  
    async deleteOne(id) {
      const result = await productsModel.deleteOne({ _id: id });
      return result;
    }
  
    async updateOne(id, obj) {
      const result = await productsModel.updateOne({ _id: id }, obj);
      return result;
    }  
  }
  
  export const manager = new ProductsManager();