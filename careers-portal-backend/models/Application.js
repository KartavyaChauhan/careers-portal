// models/Application.js
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  applicantName: String,
  applicantEmail: String,
  resumeLink: String,
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // Reference to the Job model
  },
  status: {
    type: String,
    enum: ['Applied', 'Interview Scheduled', 'Interview Completed', 'Offer Made', 'Rejected'],
    default: 'Applied',
  },
  interviewDate: Date,
  interviewLink: String,
  feedback: String,
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application; // Ensure this is a default export
