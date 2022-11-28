const router = require("express").Router();
const UserController = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const ProductController = require("../controllers/ProductController");


// 1. Login Registration JWT Token 2. Profile Update

router.post("/UserRegister", UserController.UserRegister);
router.post("/UserLogin", UserController.UserLogin);
router.post("/VerifyUserCode", UserController.VerifyCode);
router.post("/ForgotPass/:email", UserController.ForgotPass);
router.put("/ChangePassword", UserController.ChangePassword);
router.put("/UpdateUser/:id", UserController.UpdateUser);



// 3. Managing List, Create, Update,Delete,Read, Search,Filter
router.post("/AddProduct", AuthMiddleware, ProductController.AddProduct);
router.get("/GetProductById/:id", AuthMiddleware, ProductController.GetProductById);
router.put("/UpdateProduct/:id", AuthMiddleware, ProductController.UpdateProduct);
router.delete("/DeleteProduct/:id", AuthMiddleware, ProductController.DeleteProduct);

// GetAllProduct/page=1&limit=10&search=
router.get("/GetAllProduct", AuthMiddleware, ProductController.GetAllProduct);


module.exports = router;
