import express from "express";
import {dbconnect} from "./config/db.js"
import bodyparser from "body-parser"
import cors from "cors"
import path from "path"
import stripePackage from 'stripe';
import { createWishlist, getProduct, getProducts, createProduct, getAllWatchlist, getCartDetails, addToCart, removeItemFromCart} from "./routes/product.js";

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


app.get('/getProducts',getProducts)
app.get('/getProduct/:id',getProduct)
app.post('/api/wishlist',createWishlist)
app.post('/createProduct', createProduct)
app.get('/getAllWatchlist/:id', getAllWatchlist)
app.get('/getCartDetails/:id', getCartDetails)
app.post('/addToCart', addToCart);
app.post('/removeItemFromCart', removeItemFromCart);

// //payment
// const Publishable_Key = process.env.Publishable_Key
// const Secret_Key = process.env.Secret_Key

// const stripe = stripePackage('Secret_Key')

// // View Engine Setup
// // app.set('views', path.join(__dirname, 'views'))
// const viewsPath = path.join(import.meta.url, 'views').replace('file://', '')
// app.set('views', viewsPath);
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