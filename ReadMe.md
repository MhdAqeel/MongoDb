# 📦 MongoDB CRUD & Aggregation Cheat Sheet

![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?style=for-the-badge\&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A quick and practical reference for **MongoDB CRUD operations, queries, indexing, and aggregation pipelines**.

---

## 📚 Table of Contents

* [1. Database & Collection Management](#1-database--collection-management)
* [2. Inserting Data (Create)](#2-inserting-data-create)
* [3. Finding & Filtering (Read)](#3-finding--filtering-read)
* [4. Updating & Indexing (Update)](#4-updating--indexing-update)
* [5. Deleting Data (Delete)](#5-deleting-data-delete)
* [6. Aggregation Pipeline](#6-aggregation-pipeline)

---

## 🗄️ 1. Database & Collection Management

```js
use PMSD;
db.createCollection("product");

show dbs;
show collections;

db.product.drop();
db.dropDatabase();
```

---

## ➕ 2. Inserting Data (Create)

<details>
<summary>Insert One & Many</summary>

```js
db.product.insertOne({
  order_id: "o0",
  year: 2021
});

db.product.insertMany([
  {
    order_id: "o1",
    year: 2023,
    cost: { price: 650, currency: "USD" },
    items: [
      {
        product_id: "p1",
        colours: ["blue"],
        quantity: 3,
        delivery_days: 4
      }
    ]
  }
]);
```

</details>

---

## 🔍 3. Finding & Filtering (Read)

<details>
<summary>Basic Queries</summary>

```js
db.product.find().pretty();
db.product.findOne({ order_id: "o1" });

db.product.find().limit(5);
db.product.find().sort({ year: 1 });
```

</details>

<details>
<summary>Query Operators</summary>

```js
db.product.find({ year: 2023 });

db.product.find({ "cost.price": { $gt: 600 } });
db.product.find({ "items.delivery_days": { $lt: 5 } });

db.product.find({ year: { $in: [2022, 2023] } });
db.product.find({ order_id: { $regex: /^o/ } });
```

</details>

<details>
<summary>Array Queries</summary>

```js
db.product.find({ "items.product_id": "p1" });
db.product.find({ "items.colours": "blue" });
db.product.find({ "items.quantity": { $gt: 2 } });
```

</details>

<details>
<summary>Projection</summary>

```js
db.product.find(
  {},
  { order_id: 1, year: 1, "cost.price": 1, _id: 0 }
);
```

</details>

---

## 🔄 4. Updating & Indexing (Update)

<details>
<summary>Update Operations</summary>

```js
db.product.updateOne(
  { order_id: "o2" },
  { $set: { "items.$[].delivery_days": 3 } }
);
```

</details>

<details>
<summary>Common Operators</summary>

* `$set` → Set value
* `$push` → Add to array
* `$rename` → Rename field
* `$inc` → Increment value

</details>

<details>
<summary>Indexing</summary>

```js
db.product.createIndex({ "cost.price": 1 });
db.product.getIndexes();
```

</details>

---

## ❌ 5. Deleting Data (Delete)

```js
db.product.deleteOne({ order_id: "o1" });

db.product.deleteMany({ year: { $lt: 2020 } });

db.product.deleteMany({});
```

---

## 📊 6. Aggregation Pipeline

<details>
<summary>Count Orders Per Year</summary>

```js
db.product.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } }
]);
```

</details>

<details>
<summary>Average Price</summary>

```js
db.product.aggregate([
  { $group: { _id: null, avgPrice: { $avg: "$cost.price" } } }
]);
```

</details>

<details>
<summary>Total Quantity Per Product</summary>

```js
db.product.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product_id",
      totalQty: { $sum: "$items.quantity" }
    }
  }
]);
```

</details>

<details>
<summary>Revenue for 2023</summary>

```js
db.product.aggregate([
  { $match: { year: 2023 } },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$cost.price" }
    }
  }
]);
```

</details>

---

## 🚀 Tips

* Use **indexes** for faster queries
* Prefer **aggregation pipeline** for analytics
* Use **projection** to reduce data load
* Keep documents **structured & consistent**

---

## 👨‍💻 Author

**MhdAqeel**

---

## ⭐ Support

If you found this helpful, give it a ⭐ on GitHub!

---
