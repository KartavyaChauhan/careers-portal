// controllers/jobController.js
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// POST /api/jobs
export const postJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: 'Failed to post job' });
  }
};

// GET /api/jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// POST /api/jobs/:jobId/apply
export const applyToJob = async (req, res) => {
  try {
    console.log('Applying to job:', req.params.jobId);
    console.log('Application data:', req.body);

    // Validate job exists
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      console.log('Job not found:', req.params.jobId);
      return res.status(404).json({ error: 'Job not found' });
    }

    const application = new Application({
      ...req.body,
      jobId: req.params.jobId,
      status: 'Applied'
    });

    console.log('Saving application:', application);
    await application.save();
    console.log('Application saved successfully');

    res.status(201).json(application);
  } catch (error) {
    console.error('Error applying to job:', error);
    res.status(500).json({ error: 'Failed to apply', details: error.message });
  }
};

// GET /api/jobs/:jobId/applications
export const getApplicationsByJob = async (req, res) => {
  try {
    console.log('Fetching applications for job:', req.params.jobId);
    
    // Validate job exists
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      console.log('Job not found:', req.params.jobId);
      return res.status(404).json({ error: 'Job not found' });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('jobId', 'title description')
      .sort({ createdAt: -1 });

    console.log('Found applications:', applications.length);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to get applications', details: error.message });
  }
};

// POST /api/jobs/:jobId/interview
export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, interviewDate, interviewLink } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, {
      interviewDate,
      interviewLink,
      status: 'Interview Scheduled',
    }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule interview' });
  }
};

// POST /api/jobs/:jobId/feedback
export const submitFeedback = async (req, res) => {
  try {
    const { applicationId, feedback } = req.body;
    const application = await Application.findByIdAndUpdate(applicationId, {
      feedback,
      status: 'Interview Completed',
    }, { new: true });
    res.json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};
// PUT /api/jobs/:applicationId/status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    // Use findOneAndDelete to trigger the pre-remove middleware
    const job = await Job.findOneAndDelete({ _id: jobId });
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(200).json({ message: 'Job and associated applications deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    res.status(500).json({ message: 'Internal server error while deleting job' });
  }
};

// Debug route to view all data
export const getAllJobsWithApplications = async (req, res) => {
  try {
    const jobs = await Job.find().lean();
    const applications = await Application.find().lean();
    
    res.json({
      totalJobs: jobs.length,
      totalApplications: applications.length,
      jobs,
      applications
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

// GET /api/jobs/:id
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Error fetching job:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid job ID format' });
    }
    res.status(500).json({ message: 'Error fetching job' });
  }
};

// Debug route to view all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('jobId');
    console.log('All applications:', applications);
    res.json(applications);
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

