import { findProdById } from "../services/products.service";
export const avoidDeletion = () => {
    // Necesito el return para indicar que estoy devolviendo una función, porque es una funcion flecha
      return async (req, res, next) => {      
            
        try {      
          const { pid } = req.params
          const product = await findProdById(pid)
  
          
          if ((req.user.role === 'PREMIUM') && (product.owner != req.user._id)) {
              return res.json({message: 'You cant delete a product that you dont own'})
          }                        
          next();
          
        } catch (error) {
          return res.status(401).json({ message: 'Unauthorized error' });
        }
      };
    };
  
  