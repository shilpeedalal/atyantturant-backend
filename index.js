import express from "express";
import {dbconnect} from "./config/db.js"
import bodyparser from "body-parser"
import path from "path"
import stripePackage from 'stripe';
import { createWishlist, getProduct, getProducts, createProduct, getAllWatchlist, getCartDetails, addToCart} from "./routes/product.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


app.get('/getProducts',getProducts)
app.get('/getProduct/:id',getProduct)
app.post('/api/wishlist',createWishlist)
app.post('/createProduct', createProduct)
app.get('/getAllWatchlist/:id', getAllWatchlist)
app.get('/getCartDetails/:id', getCartDetails)
app.post('/addToCart', addToCart);
// //payment
// const Publishable_Key = process.env.Publishable_Key
// const Secret_Key = process.env.Secret_Key

// // const stripe = require('stripe')(Secret_Key)

// // View Engine Setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// app.get('/', function(req, res){
// 	res.render('Home', {
// 	key: Publishable_Key
// 	})
// })

// app.post('/payment', function(req, res){

// 	// Moreover you can take more details from user
// 	// like Address, Name, etc from form
// 	stripe.customers.create({
// 		email: req.body.stripeEmail,
// 		source: req.body.stripeToken,
// 		name: 'Shilpee',
// 		address: {
// 			line1: 'Chhara',
// 			postal_code: '124504',
// 			city: 'Jhajjar',
// 			state: 'Haryana',
// 			country: 'India',
// 		}
// 	})
// 	.then((customer) => {

// 		return stripe.charges.create({
// 			amount: 2500,	 // Charging Rs 25
// 			description: 'Attyantturant Product',
// 			currency: 'INR',
// 			customer: customer.id
// 		});
// 	})
// 	.then((charge) => {
// 		res.send("Success") // If no error occurs
// 	})
// 	.catch((err) => {
// 		res.send(err)	 // If some error occurs
// 	});
// })

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})