import express from "express";
import { Product } from "../model/product.js";
import { User } from "../model/user.js";
import { Wishlist } from "../model/wishlist.js";
import { Cart } from "../model/cart.js";

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
