const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// Notice we use 'mongo-db' here! This is the exact name we used in docker-compose.yml

// Use the environment variable from docker-compose, or fallback to the mongo service name
mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/devops_db")
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));


// Our original status route
app.get('/api/status', (req, res) => {
    // Now it also checks if the database is connected (1 means connected)
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    
    res.json({ 
        message: 'Hello! Your DevOps backend is running successfully.', 
        database: dbStatus 
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});