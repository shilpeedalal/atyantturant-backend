import express from "express";
import { Product } from "../model/product.js";
import { User } from "../model/user.js";
import { Wishlist } from "../model/wishlist.js";
import { Cart } from "../model/cart.js";
import Stripe from "stripe";

const { STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);


//get all Products
export const getProducts = async (req, res) => {
  const products = await Product.find();
  try {
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server error",
    });
  }
};

//get Product by ID
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

// Wishlist
export const createWishlist = async (req, res) => {
  const { product_id, userId } = req.body;

  try {
    console.log(typeof product_id);
    let product = await Product.findOne({ product_id });
    console.log(product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let userWishlist = await Wishlist.create({ product_id, userId });
    console.log(userWishlist);
    res
      .status(201)
      .json({ message: "Product added to wishlist", wishlist: userWishlist });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllWatchlist = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await Wishlist.find({ userId });
    if (!response) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

//create product

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await Product.create(req.body);
    console.log(newProduct);
    res.status(200).json({ newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//Add to cart
export const addToCart = async (req, res) => {

  const { userId, product_id } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if(!cart) {
      cart = await Cart.create({ userId, total_amount: 0 });
    }
    let product = await Product.findOne({ product_id });
    cart.product.push(product);
    cart.quantity += 1;
    cart.total_amount = cart.total_amount + product.price;
    
    const response = await Cart.findOneAndUpdate({userId}, cart, {
      new: true
    });

    res.status(201).json({ message: "Product added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


//get cart details
export const getCartDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await Cart.find({ userId });
    if (!response) {
      return res.status(404).json({ error: "No products found" });
    }

    return res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
}

// remove product from cart
export const removeItemFromCart = async (req, res) => {
  const { product_id, userId } = req.body;

  const cart = await Cart.findOne({ userId });
  console.log("Cart :", cart);

  const indexToRemove = cart.product.findIndex(
    (item) => item.product_id === product_id
  );

  let removedProduct = cart.product[indexToRemove];

  if (indexToRemove !== -1) {
    cart.product.splice(indexToRemove, 1);
    cart.quantity -= 1;
    cart.total_amount -= removedProduct.price;
  } else {
    res.status(404).json({ message: "No object found with the given product_id" });
  }

  await Cart.findOneAndUpdate({ userId }, cart, {
    new: true,
  });
  
  res.status(200).json({ message: "Product removed from cart", cart });
}

// payment

export const renderBuyPage = async(req,res)=>{

  try {
      const resp = await Cart.findOne({ userId: 1 });
      const amount = resp.total_amount;

      res.render('buy', {
          key: STRIPE_PUBLISHABLE_KEY,
          amount
       })

  } catch (error) {
      console.log(error.message);
  }

}

export const success = async(req,res)=>{

  try {
      
      res.render('success');

  } catch (error) {
      console.log(error.message);
  }

}

export const failure = async(req,res)=>{

  try {
      
      res.render('failure');

  } catch (error) {
      console.log(error.message);
  }

}

export const payment = async(req,res)=>{

try {

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1NvldnSGQ0ucF0bOEk9K7JGD',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `https://atyant.onrender.com/success`,
    cancel_url: `https://atyant.onrender.com/failure`,
  });

  res.redirect(303, session.url);

} catch (error) {
    console.log(error.message);
}
}