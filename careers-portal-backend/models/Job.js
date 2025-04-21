// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.model('Job', jobSchema);

export default Job; // Ensure this is a default export
