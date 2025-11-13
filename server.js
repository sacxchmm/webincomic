const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs"); // for storing submissions in a file (optional)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // allows requests from your frontend domain
app.use(bodyParser.json());

// Endpoint to handle contact form submission
app.post("/api/contact", (req, res) => {
  const formData = req.body;

  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Save to a file (optional)
  const submissionsFile = "submissions.json";
  let submissions = [];

  if (fs.existsSync(submissionsFile)) {
    submissions = JSON.parse(fs.readFileSync(submissionsFile));
  }

  submissions.push({
    ...formData,
    submittedAt: new Date().toISOString(),
  });

  fs.writeFileSync(submissionsFile, JSON.stringify(submissions, null, 2));

  // Send response
  res.status(200).json({ message: "Form submitted successfully!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

