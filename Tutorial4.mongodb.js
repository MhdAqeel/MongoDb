use PMSD;

db.createCollection("product");

db.product.insertMany([
    {
        order_id: "o1",
        year: 2023,
        cost: { price: 450, currency: "USD" },
        items: [
            { product_id: "p1", colours: ["red", "black"], quantity: 1, delivery_days: 6 }
        ]
    },
    {
        order_id: "o2",
        year: 2023,
        cost: { price: 120000, currency: "LKR" },
        items: [
            { product_id: "p2", colours: ["blue"], quantity: 3, delivery_days: 2 },
            { product_id: "p3", colours: ["white"], quantity: 1, delivery_days: 4 }
        ]
    },
    {
        order_id: "o3",
        year: 2024,
        cost: { price: 550, currency: "USD" },
        items: [
            { product_id: "p1", colours: ["green"], quantity: 5, delivery_days: 10 },
            { product_id: "p4", colours: ["blue", "yellow"], quantity: 2, delivery_days: 3 }
        ]
    },
    {
        order_id: "o4",
        year: 2025,
        cost: { price: 100000, currency: "Yuwan" },
        items: [
            { product_id: "p5", colours: ["black"], quantity: 1, delivery_days: 1 }
        ]
    }
]);