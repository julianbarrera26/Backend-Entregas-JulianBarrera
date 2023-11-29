import {productsModel} from "../../db/models/products.model.js";

class ProductsManager {
    async findAll(page, limit, category, status, sort) {
		let options = {
			page: page || 1,
			limit: limit || 10
		}
		try {
			if (category) {
				const products = await productsModel.paginate({ category: category }, options)
				return products
			}

			if (status) {
				const products = await productsModel.paginate({ status: status }, options)
				return products
			}

			if (sort) {
				if (sort === 'asc') {
					options.sort = { price: 1 }
					console.log(options)

					const products = await productsModel.paginate({}, options)
					return products
				}
				if (sort === 'desc') {
					options.sort = { price: -1 }
					const products = await productsModel.paginate({}, options)
					return products
				}
			}

			const products = await productsModel.paginate({}, options)
			return products
		} catch (error) {
			throw new Error(error)
		}
	}

    async addProduct  (product) {
        try {
            await productsModel.create(product);
            return await productsModel.findOne({ title: product.title })
        }
        catch (err) {
            return err
        }
      
      }
     async getProductsView ()  {
        try {
            return await productsModel.find().lean();

        } catch (err) {
            return err
        }
    }

    async getProducts  (filter, options) {
        try {
            //  return await productsModel.find().lean();
            return await productsModel.paginate(filter, options);
        } catch (err) {
            return err
        }
    }

    async getProductById(id) {
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

export const productsManager = new ProductsManager();