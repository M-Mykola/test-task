const db = require("./db");

async function exec() {
  const result = db.map((item) => {
    if (item.geo_zone === "DZ") {
      const arr = item.orders[item.orders.length - 1];
      const fullName = ` ${item.firstName} ${item.lastName} `;
      const id_ = item.id;

      const totalPrices = arr.items.reduce(
        (acc, curr) => {
          acc.price += curr.cost;
          return acc;
        },
        { price: 0, currency: "USD" }
      );

      const regCode = item.code + arr.type;
      return {
        userId: id_,
        fullName: fullName,
        regCode,
        totalPrices: [totalPrices],
      };
    }
  });
  console.log(result[0]);
}
exec();

// TODO Need to get the list of customers from geo_zone = 'DZ' and count the total price of the last order

/*
    Structure of response must be as following:
    {
       userId: '2K0aNct9sNbJGn2nNOLa',
       userFullName: 'John Spenser',
       regCode: 'DZ_445GN-ZM_1100',
       totalPrices: [
         {
            amount: 2500,
            currency: 'USD'
         }
       ]
    

    regCode is user.code + lastOrder.type
    */

function getLatestDate(data) {
  const sorted_orders = data
    .map((item) => {
      item.orderedAt = new Date(item.orderedAt).getTime();
      return item;
    })
    .sort((a, b) => {
      if (a.orderedAt < b.orderedAt) {
        return -1;
      }
      if (a.orderedAt > b.orderedAt) {
        return 1;
      }
      return 0;
    });
  const latest_order = sorted_orders[sorted_orders.length - 1];
  return latest_order;
}

async function getDataFromDB() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(db);
      }, 3000);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = exec;
