import { MongoCartManager } from "../dao/mongoDB/cartManagerMongo.js"
import { MongoProductManager } from "../dao/mongoDB/productsManagerMongo.js";

const mongoProductManager = new MongoProductManager
const mongoCartManager = new MongoCartManager

class ViewsService{
    async getProducts(limit, page, filtro){
        return await mongoProductManager.getProducts(limit, page, filtro)
    }

    async getCartProducts(cid, limit, page){
        return await mongoCartManager.getCartProducts(cid, limit, page)
    }
}

export default ViewsService