const router = express.Router();                 // a mini-app for /record addresses
router.get("/", async (req, res) => {            // when someone sends GET /record ...
let collection = db.collection("records");     // pick the "records" collection
let results = await collection.find({}).toArray(); // {} = no filter, so get everything
 res.send(results);                              // send the list back as JSON
 });