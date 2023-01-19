export const getTotalAmmount = (cart) => {
  return (
    cart.reduce((totalPrice, item) => {
      return totalPrice + item.price * item.buyQantity || 0;
    }, 0) || 0
  ).toFixed(2);
};
