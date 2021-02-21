const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const cors = require("cors"); 
app.use(cors());
// parse requests of content-type: application/json
app.use( bodyParser.json( { limit: '50MB' } ) );
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Incomm API"})
})

require("./app/routes/customer.routes.js")(app);
require("./app/routes/contract.routes.js")(app);
require("./app/routes/cv.routes.js")(app);
require("./app/routes/media.routes.js")(app);
require("./app/routes/offer_sectors.routes.js")(app);
require("./app/routes/business_sectors.routes.js")(app);
require("./app/routes/candidate_offer.routes.js")(app);
require("./app/routes/posts.routes.js")(app);
require("./app/routes/offers.routes.js")(app);
require("./app/routes/companies.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/candidates.routes.js")(app);
require("./app/routes/employees.routes.js")(app);
require("./app/routes/comments.routes.js")(app);
require("./app/routes/likes_post.routes.js")(app);
require("./app/routes/likes_offer.routes.js")(app);
require("./app/routes/apply_offer.routes.js")(app);

//set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.")
})