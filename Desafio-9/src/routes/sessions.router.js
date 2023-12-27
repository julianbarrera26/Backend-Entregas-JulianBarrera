/* import { uManager } from "../dao/managersMongo/usersManager.js"; */
import { hashData, compareData } from "../utils.js";
import {Router} from "express"
import passport from "passport"
import "../passport.js"
import { generateToken } from "../utils.js"


const router = Router();


router.post('/signup', passport.authenticate('signup'),(req, res) => {
    res.json({message: 'Signed up'})    
})




router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res) => {
  res.status(200).json({message: 'User logged', user: req.user})  
})


router.get('/signout', async(req, res)=>{
  req.session.destroy(()=> {       
      res.redirect('/login')
  })
})



router.post('/login', passport.authenticate('login', {failureMessage: true, failureRedirect: "/login"}),(req, res) => {
 
    const {first_name, last_name, email, age, role, carts} = req.user    
   
    const token = generateToken({ first_name, last_name, email, age, role, carts})
    res.cookie('token', token, { maxAge: 60000, httpOnly: true })
    return res.redirect('/api/sessions/current')
}) 

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] })
);

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
  console.log('req: ',req.user)
  req.session.user = req.user.first_name
  req.session.admin = false
  req.session.usuario = true
  res.redirect('http://localhost:8080/products')
})

router.get("/callback", passport.authenticate("github"), (req, res) => {
  res.redirect('/products');
});

router.post("/restaurar", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await uManager.findUserByEmail(email);      
    if (!user) {        
      return res.redirect("/restaurar");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});



export default router



