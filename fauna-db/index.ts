const faunadb = require("faunadb");
const q = faunadb.query;

console.log(process.env.FAUNA)

let client = new faunadb.Client({ secret: process.env.FAUNA });

async function run() {
    try {

        const results = await client.query(
            q.Create(q.Collection("rooms"), {
                data: {
                    name: "Cave",
                    color: '#FF00FF',
                }
            })
        );
        console.log(results)
    } catch (error) {
        console.log('ennnnculéééééééé', error)
    }
}

run();