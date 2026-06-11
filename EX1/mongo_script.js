const { MongoClient } = require("mongodb");
const fs = require("fs");

const client = new MongoClient("mongodb://localhost:27017");

async function main() {
    try {

        await client.connect();

        const col = client
            .db("user_managed")
            .collection("transactions");

        await col.drop().catch(() => {});

        const data1 = JSON.parse(
            fs.readFileSync("transactions.json")
        );

        await col.insertMany(data1);

        const data2 = JSON.parse(
            fs.readFileSync("transactions_upsert.json")
        );

        for (let doc of data2) {
            await col.updateOne(
                { _id: doc._id },
                { $set: doc },
                { upsert: true }
            );
        }

        console.log(
            "Data inserted and upserted successfully"
        );

    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
}

main();