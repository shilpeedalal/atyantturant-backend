import express from "express";
import {dbconnect} from "./config/db.js"
import bodyparser from "body-parser"
import cors from "cors"
import path from "path"
import stripePackage from 'stripe';
import { createWishlist, getProduct, getProducts, createProduct, getAllWatchlist, getCartDetails, addToCart, removeItemFromCart, renderBuyPage, payment, success, failure } from "./routes/product.js";

const app = express();
app.use(cors());
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
const PORT = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.set('view engine', 'ejs');


app.get('/getProducts',getProducts)
app.get('/getProduct/:id',getProduct)
app.get('/getAllWatchlist/:id', getAllWatchlist)
app.get('/getCartDetails/:id', getCartDetails)
app.get('/', renderBuyPage);

app.post('/api/wishlist',createWishlist)
app.post('/createProduct', createProduct)
app.post('/addToCart', addToCart);
app.post('/removeItemFromCart', removeItemFromCart);
app.post('/payment', payment);
app.get('/success', success);
app.get('/failure', failure);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})