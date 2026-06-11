const { MongoClient } = require("mongodb");

async function main() {

    const client = new MongoClient(
        "mongodb://localhost:27017"
    );

    await client.connect();

    const col = client
        .db("user_managed")
        .collection("transactions");

    await col.deleteMany({});

    await col.insertMany([
        {_id:1,Name:"Somu",Payment:{Total:600},Transaction:{price:450}},
        {_id:2,Name:"John",Payment:{Total:500},Transaction:{price:350}},
        {_id:3,Name:"Alice",Payment:{Total:300},Transaction:{price:400}},
        {_id:4,Name:"Bob",Payment:{Total:200},Transaction:{price:600}},
        {_id:5,Name:"Somu",Payment:{Total:1000},Transaction:{price:550}}
    ]);

    console.log(
        await col.find({Name:"Somu"}).toArray()
    );

    console.log(
        await col.find({"Payment.Total":600}).toArray()
    );

    console.log(
        await col.find({
            "Transaction.price":{
                $gte:300,
                $lte:500
            }
        }).toArray()
    );

    let t = await col.aggregate([
        {
            $group:{
                _id:null,
                totalAmount:{
                    $sum:"$Payment.Total"
                }
            }
        }
    ]).toArray();

    console.log(
        "Total Payment Amount:",
        t[0].totalAmount
    );

    await client.close();
}

main();