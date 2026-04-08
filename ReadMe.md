<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MongoDB CRUD & Aggregation Cheat Sheet</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #0d1117;
      color: #c9d1d9;
      padding: 20px;
      line-height: 1.6;
    }
    h1, h2 {
      color: #58a6ff;
      border-bottom: 1px solid #30363d;
      padding-bottom: 5px;
    }
    code {
      background-color: #161b22;
      padding: 10px;
      display: block;
      border-radius: 6px;
      overflow-x: auto;
      color: #8b949e;
    }
    .section {
      margin-bottom: 30px;
    }
  </style>
</head>
<body>

<h1>📦 MongoDB Cheat Sheet</h1>

<div class="section">
  <h2>1. Database & Collection Management</h2>
  <code>
use PMSD;
db.createCollection("product");
show dbs;
show collections;
db.product.drop();
db.dropDatabase();
  </code>
</div>

<div class="section">
  <h2>2. Inserting Data (Create)</h2>
  <code>
db.product.insertOne({ order_id: "o0", year: 2021 });

db.product.insertMany([
  {
    order_id: "o1",
    year: 2023,
    cost: { price: 650, currency: "USD" },
    items: [
      { product_id: "p1", colours: ["blue"], quantity: 3, delivery_days: 4 }
    ]
  }
]);
  </code>
</div>

<div class="section">
  <h2>3. Finding & Filtering (Read)</h2>
  <code>
db.product.find().pretty();
db.product.findOne({ order_id: "o1" });
db.product.find().limit(5);
db.product.find().sort({ year: 1 });

db.product.find({ year: 2023 });
db.product.find({ "cost.price": { $gt: 600 } });
db.product.find({ "items.delivery_days": { $lt: 5 } });
db.product.find({ year: { $in: [2022, 2023] } });
db.product.find({ order_id: { $regex: /^o/ } });

db.product.find({ "items.product_id": "p1" });
db.product.find({ "items.colours": "blue" });
db.product.find({ "items.quantity": { $gt: 2 } });

db.product.find({}, { order_id: 1, year: 1, "cost.price": 1, _id: 0 });
  </code>
</div>

<div class="section">
  <h2>4. Updating & Indexing (Update)</h2>
  <code>
db.product.updateOne(
  { order_id: "o2" },
  { $set: { "items.$[].delivery_days": 3 } }
);

// Operators
// $set, $push, $rename, $inc

db.product.createIndex({ "cost.price": 1 });
db.product.getIndexes();
  </code>
</div>

<div class="section">
  <h2>5. Deleting Data (Delete)</h2>
  <code>
db.product.deleteOne({ order_id: "o1" });
db.product.deleteMany({ year: { $lt: 2020 } });
db.product.deleteMany({});
  </code>
</div>

<div class="section">
  <h2>6. Aggregation Pipeline</h2>
  <code>
// Count orders per year
db.product.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } }
]);

// Average price
db.product.aggregate([
  { $group: { _id: null, avgPrice: { $avg: "$cost.price" } } }
]);

// Total quantity per product
db.product.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.product_id", totalQty: { $sum: "$items.quantity" } } }
]);

// Revenue for 2023
db.product.aggregate([
  { $match: { year: 2023 } },
  { $group: { _id: null, totalRevenue: { $sum: "$cost.price" } } }
]);
  </code>
</div>

</body>
</html>
