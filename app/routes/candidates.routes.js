module.exports = app => {
    const candidate = require("../controllers/candidates.controller.js");
  
    // Create a new Candidate
    app.post("/candidate", candidate.create);
  
    // Retrieve all Candidates
    app.get("/candidate", candidate.findAll);
  
    // Retrieve a single Candidate with candidateId
    app.get("/candidate/:candidateId", candidate.findOne);

    app.get("/candidate/name/:candidateName", candidate.findOneByName)
  
    // Update a Candidate with candidateId
    app.put("/candidate/:candidateId", candidate.update);
  
    // Delete a Candidate with candidateId
    app.delete("/candidate/:candidateId", candidate.delete);
  
    // Create a new Candidate
    app.delete("/candidate", candidate.deleteAll);
  };