// models/Job.js
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  type: { type: String, required: true },
  location: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
  active: { type: Boolean, default: true }
}, { timestamps: true });

// Add a pre-remove middleware to delete associated applications
jobSchema.pre('findOneAndDelete', async function(next) {
  try {
    const jobId = this.getQuery()["_id"];
    await mongoose.model('Application').deleteMany({ jobId: jobId });
    next();
  } catch (error) {
    next(error);
  }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
