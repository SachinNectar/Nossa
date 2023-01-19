import { baseurl } from "./request";

export class CartUtils {
  static key = `kindle__cart__${baseurl}`;

  static getAll = () => {
    console.log(CartUtils.key);
    console.log(localStorage.getItem(CartUtils.key));

    return JSON.parse(localStorage.getItem(CartUtils.key) || "[]");
  };
  constructor(ins) {
    this.key = this.constructor.key;
    this.ins = ins;
  }

  addOrUpdateCart = () => {
    const allCartProduct = this.constructor.getAll();
    let filteredList = allCartProduct;
    if (this.ins.id) {
      filteredList = allCartProduct.filter((item) => item !== this.ins.id);
    }
    localStorage.setItem(this.key, JSON.stringify([...filteredList, this.ins]));

    return filteredList;
  };

  deleteCart = () => {
    const allCartProduct = this.constructor
      .getAll()
      .filter((item) => item !== this.ins.id);
    localStorage.setItem(this.key, JSON.stringify(allCartProduct));

    return allCartProduct;
  };

  saveAllCart = () => {
    localStorage.setItem(this.key, JSON.stringify(this.ins));
  };
}
