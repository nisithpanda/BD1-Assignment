const express = require('express');
const cors = require('cors');

const app = express();
const port = 3010;

app.use(cors());

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

/***
 * EndPoint 1 - newItemPrice, cartTotal as query param
 * @returns total price
 */
app.get('/cart-total', (req, res) => {
  const newItemPrice = parseFloat(req.query.newItemPrice);
  const cartTotal = parseFloat(req.query.cartTotal);

  const totalPrice = newItemPrice + cartTotal;

  res.send(totalPrice.toString());
});

/***
 * EndPoint 2 - Apply a discount based on membership status
 * @param cartTotal as String
 * @param isMember as String
 * @returns totalPrice as String
 */
app.get('/membership-discount', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);
  const isMember = req.query.isMember;
  let result = cartTotal;
  if (isMember === 'true') {
    result = cartTotal - (cartTotal * discountPercentage) / 100;
  }

  res.send(result.toString());
});

/***
 * EndPoint 3 - Calculate tax on the cart total
 * @param cartTotal as String
 * @returns tax as String
 */
app.get('/calculate-tax', (req, res) => {
  const cartTotal = parseFloat(req.query.cartTotal);

  let tax = (cartTotal * taxRate) / 100;

  res.send(result.toString());
});

/***
 * EndPoint 4 - Estimate delivery time based on shipping method
 * @param shippingMethod as String
 * @param distance as String
 * @returns time as String
 */
app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.cartTotal.toLowerCase();
  const distance = parseFloat(req.query.distance);
  let time;
  if (shippingMethod === 'express') {
    time = Math.ceil(distance / 100);
  } else {
    time = Math.ceil(distance / 50);
  }

  res.send(time.toString());
});

/***
 * EndPoint 5 - Calculate the shipping cost based on weight and distance
 * @param weight as String
 * @param distance as String
 * @returns cost as String
 */
app.get('/shipping-cost', (req, res) => {
  const weight = parseFloat(req.query.weight);
  const distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;

  res.send(shippingCost.toString());
});

/***
 * EndPoint 6 - Calculate loyalty points earned from a purchase
 * @param purchaseAmount as String
 * @returns loyaltyPoints as String
 */
app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * loyaltyRate;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
