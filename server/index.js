require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const admin = require("firebase-admin");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const serviceAccount = require("./zap-shift-firebase-admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const uri = process.env.DB_MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const db = client.db("zapshiftDB");
        const parcelCollection = db.collection("parcels");
        const paymentsCollection = db.collection('payments');
        const ridersCollection = db.collection('riders')
        const usersCollection = db.collection('users');

        // custom middlewares
        const verifyFirebaseToken = async (req, res, next) => {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).send({ message: 'unauthorized access' })
            }
            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).send({ message: 'unauthorized access' })
            }

            // verify_the_token
            try {
                const decoded = await admin.auth().verifyIdToken(token)
                req.decoded = decoded;

            }
            catch (error) {
                return res.status(403).send({ message: 'forbidden access' })
            }

            next()
        }

        // GET /api/parcels?email=user@example.com
        app.get('/parcels', verifyFirebaseToken, async (req, res) => {
            const email = req.query.email;

            if (!email) return res.status(400).send({ message: "Missing email" });

            const result = await parcelCollection.find({ sender_email: email }).toArray();
            res.send(result);
        });


        // POST /api/parcels
        app.post('/parcels', async (req, res) => {
            const newParcel = req.body;
            const result = await parcelCollection.insertOne(newParcel);
            res.send(result);
        });

        // DELETE /api/parcels/:id
        app.delete('/parcels/:id', async (req, res) => {
            const id = req.params.id;
            const result = await parcelCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });
        // GET /api/parcels/:id
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });
            res.send(parcel);
        });



        // GET: Get a specific parcel by ID
        app.get('/parcels/:id', async (req, res) => {
            try {
                const id = req.params.id;

                const parcel = await parcelCollection.findOne({ _id: new ObjectId(id) });

                if (!parcel) {
                    return res.status(404).send({ message: 'Parcel not found' });
                }

                res.send(parcel);
            } catch (error) {
                console.error('Error fetching parcel:', error);
                res.status(500).send({ message: 'Failed to fetch parcel' });
            }
        });

        app.post('/create-payment-intent', async (req, res) => {
            const { amount } = req.body;
            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount, // Amount in cents
                    currency: 'usd',
                    payment_method_types: ['card'],
                });

                res.send({ clientSecret: paymentIntent.client_secret });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });


        // ⬇️ 2. Save Payment Info & Update Parcel
        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const result = await paymentsCollection.insertOne(payment);

            // ✅ ২. parcels collection-এ ঐ parcel এর status update করো
            const updateResult = await parcelCollection.updateOne(
                { _id: new ObjectId(payment.parcelId) },
                {
                    $set: {
                        status: 'paid',
                        transactionId: payment.transactionId,
                    },
                }
            );

            res.send({
                message: 'Payment saved and parcel updated',
                insertResult: result,
                updateResult: updateResult,
            });
        });

        app.post('/users', async (req, res) => {
            const email = req.body.email;
            const userExists = await usersCollection.findOne({ email })
            if (userExists) {
                // update last log in
                return res.status(200).send({ message: 'User already exists', inserted: false });
            }
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/users', verifyFirebaseToken, async (req, res) => {
            const users = await db.collection('users')
                .find()
                .sort({ createdAt: -1 })
                .toArray();
            res.send(users);
        });


        app.post('/riders', async (req, res) => {
            const rider = req.body;
            const result = await ridersCollection.insertOne(rider);
            res.send(result);
        });

        app.get('/riders', verifyFirebaseToken, async (req, res) => {
            const status = req.query.status;
            const query = status ? { status } : {};
            const riders = await db.collection("riders").find(query).toArray();
            res.send(riders);
        });

        app.patch('/riders/status/:id', async (req, res) => {
            const id = req.params.id;
            const { status } = req.body;

            const result = await db.collection("riders").updateOne(
                { _id: new ObjectId(id) },
                { $set: { status } }
            );

            res.send(result);
        });

        app.get('/riders/status', async (req, res) => {
            const email = req.query.email;
            const rider = await db.collection("riders").findOne({ email });
            res.send({ status: rider?.status || "not_applied" });
        });


        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})