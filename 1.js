// Task 1

const productPrices = document.querySelector("#productPrices");
const userOrder = document.querySelector("#userOrder");
const shopResult = document.querySelector("#shopResult");

//База данных товара
const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  pork: 80,
  cheese: 60,
  tea: 20,
  candy: 25
};

function Cashier(name, products) {
    this.name = name;
    this.products = products;

    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;

    this.countTotalPrice = function(order) {
        for (const key in order) {
            if (this.products.hasOwnProperty(key)) {
                let singleProductPrice = this.products[key] * order[key];
                this.totalPrice += singleProductPrice;
            }
        }
    };

    this.getCustomerMoney = function() {
        let checkCustomerMoney = false;
        do {
          let customerCheck = prompt(`С Вас ${this.totalPrice}`);

          if (customerCheck === null) {
            this.customerMoney = null;
            break;
          }
          customerCheck = Number(customerCheck);

          if (customerCheck >= this.totalPrice) {
            this.customerMoney = customerCheck;
            checkCustomerMoney = true;
          }
        } while (!checkCustomerMoney);        
    };

    this.countChange = function() {
        if (this.customerMoney === null) {
            this.changeAmount = null;
        }
        else {
           this.changeAmount = this.customerMoney - this.totalPrice; 
        }    
    };

    this.reset = function() {
      this.totalPrice = 0;
      this.customerMoney = 0;
      this.changeAmount = 0;
    };

    this.serve = function(order) {
        productPrices.innerText = `Цены на продукты: `;
        for (let [ key, value ] of Object.entries(products)) {
            productPrices.innerText += ` (${key}:${value}) `;
        }
        userOrder.innerText = `Заказ покупателя: `;
        for (let [key, value] of Object.entries(order)) {
          userOrder.innerText += ` (${key}:${value}) `;
        }
        // userOrder.innerText = `Заказ покупателя: ${Object.entries(order)}`;
      this.countTotalPrice(order);
      this.getCustomerMoney();
      this.countChange();
      if (this.changeAmount === null) {
        alert(`Очень жаль, что-то пошло не так, приходите еще`);
        shopResult.innerText = `Очень жаль, что-то пошло не так, приходите еще`;
      } else {
        alert(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
        shopResult.innerText = `С Вас ${this.totalPrice}. Ваши наличные ${this.customerMoney}.Спасибо за покупку, ваша сдача ${this.changeAmount}`;
      }
      this.reset();
    };
}

const order = { bread: 2, milk: 2, apples: 1, cheese: 1 };

const cashier = new Cashier(
  "Mango",
  products
);

cashier.serve(order);