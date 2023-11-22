import { Router } from "express";
import {usersManager} from "../dao/mongoDB/usersManager.js"
import { hashData, compareData } from "../utils.js";
import passport from "passport";

const router = Router();





router.post(
    "/signup",
    passport.authenticate("signup", {
      successRedirect: "/home",
      failureRedirect: "/api/views/error",
    })
  );
  
  router.post(
    "/login",
    passport.authenticate("login", {
      successRedirect: "/products",
      failureRedirect: "/api/views/error",
    })
  );
  


  // SIGNUP - LOGIN - PASSPORT GITHUB
  
  router.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"] })
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
  

  router.get("/signout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/login");
    });
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
  export default router;
