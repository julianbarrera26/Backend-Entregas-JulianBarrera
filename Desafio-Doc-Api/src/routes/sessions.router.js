/* import { uManager } from "../dao/managersMongo/usersManager.js"; */
import { hashData} from "../utils/bcrypt.js";
import {Router} from "express"
import passport from "passport"
import "../passport.js"
import { generateToken } from "../utils/jwt.js"
import { uManager } from "../dao/users.dao.js";
import { transporter } from "../utils/nodemailer.js";


const router = Router();


router.post('/signup', passport.authenticate('signup'),(req, res) => {
    res.json({message: 'Signed up'})    
})




/*router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res) => {
  res.status(200).json({message: 'User logged', user: req.user})  
})*/


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

router.post("/restart/:id", async (req, res) => { 
  const { pass, repeat } = req.body;
  const { id } = req.params  
  const user = await uManager.findUserByID(id);  
     
  if(req.cookies.tokencito){
      try {    
      
        if (pass !== repeat){
          return res.json({ message: "Passwords must match" });
        }
        const isPassRepeated = await compareData(pass, user.password)
        if(isPassRepeated){
          return res.json({ message: "This password is not allowed" });
        }     
        const newHashedPassword = await hashData(pass);    
        user.password = newHashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated", user });
      } catch (error) {
        res.status(500).json({ error });
      }
  } else {
    console.log("No hay token en las cookies. Redirigiendo manualmente a /restore");
    return res.redirect("/restore")
  }
      
});

/*router.post("/restore", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await uManager.findUserByEmail(email);      
    if (!user) {        
      return res.redirect("/restore");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});*/

router.post("/restore", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await uManager.findUserByEmail(email);      
    if (!user) {        
      return res.send("User does not exist with the email provided");
    }
    await transporter.sendMail({
      from: "julianbarrera26@gmail.com",
      to: email,
      subject: "Restaurar instructions",
      html: `<b>Please click on the link below</b>
            <a href="http://localhost:8080/restart/${user._id}">Restore password</a>
      `,
    });

    const tokencito = generateToken({email})    
    res.cookie('tokencito', tokencito, { maxAge: 3600000, httpOnly: true })
    /* console.log("tokencito", tokencito) */
    res.status(200).json({ message: "Recovery email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/mailAvisoPost", async (req, res) => {
  const { email} = req.body
  try {
    await transporter.sendMail({

      from:  "Julian",
      to: email,
      subject: "PROBANDO MAIL",
      html:`<button><a href="http://localhost:8080/api/views/restaurar">RESTAURAR PASSWORD</a></button>`
     })
     res.status(200).json({ message: "MAIL ENVIADO" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router



