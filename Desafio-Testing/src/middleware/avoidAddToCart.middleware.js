import { findProdById } from "../services/products.service";
export const avoidAddToCart = () => {
    return async (req, res, next) => {      
      const {pid}  = req.params
      const product = await findProdById(pid)      
            
      try {  
                       
          
        if ((req.user.role === 'PREMIUM') && (product.owner.toString() === req.user._id)) {
            return res.json({message: 'You cant buy this product as you own it'})
        }            
        
        next();
      } catch (error) {        
        return res.status(401).json({ message: 'Unauthorized error' });        
      }
    };
  };