const Report = require('../models/report');
const Patient = require('../models/patient');
// Render the page to create a report
exports.showCreateReportForm = async (req, res) => {
  try {
    const patients = await Patient.find(); // Fetch all patients from the database
    res.render('createReport', { patients }); // Pass patients to the view
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    res.status(500).send('Error fetching patients');
  } 
};

// Create a new report for a patient
exports.createPatientReport = async (req, res) => {
  const { patientId, status, details } = req.body;

  if (!patientId || !status || !details) {
    return res.status(400).json({ message: 'All fields are required to create a report.' });
  }
  try {
    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    // Create a new report
    const newReport = new Report({
      patient: patientId,
      status,
      details
    });

    // Save the report to the database
    await newReport.save();
    // Send a success response
    res.status(201).json({ message: 'Report created successfully!', report: newReport });
  } catch (error) {
    console.error('Error creating report:', error.message);
    // Send an error response if something goes wrong
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};
// Fetch and render all reports
exports.renderAllReportsPage = async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all reports from the database
    res.render('allReports', { reports }); // Render the 'allReports' view with reports data
  } catch (error) {
    console.error('Error rendering reports page:', error.message);
    res.status(500).send('Error rendering reports page');
  }
};
// View all reports for a specific patient
exports.viewReportsByPatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    // Fetch the patient by ID
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found.' });
    }

    // Fetch all reports for the patient
    const reports = await Report.find({ patient: patientId }).populate('patient');
    // Format the createdAt field (optional step)
    const formattedReports = reports.map(report => ({
      ...report.toObject(),
      formattedDate: report.createdAt ? report.createdAt.toLocaleDateString() : 'N/A', // Format createdAt to readable date
    }));

    // Render the view with patient name and reports
    res.render('patientReports', {
      patientName: patient.name, // Pass patient name to the template
      reports: reports // Pass the reports to the template
    });
  } catch (error) {
    console.error('Error fetching patient reports:', error.message);
    res.status(500).json({ message: 'Error fetching patient reports', error: error.message });
  }
};
// Fetch all reports and return as JSON
exports.fetchAllReports = async (req, res) => {
  try {
    const reports = await Report.find(); // Fetch all reports from the database
    res.status(200).json(reports); // Send the reports as a JSON response
  } catch (error) {
    console.error('Error fetching reports:', error.message);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// View all reports for all patients
exports.viewAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('patient'); // Fetch all reports and populate patient info
    // Format the createdAt field
    const formattedReports = reports.map(report => ({
      ...report.toObject(),
      formattedDate: report.createdAt ? report.createdAt.toLocaleDateString() : 'N/A'
    }));
    res.render('allReports', { reports }); // Render allReports.hbs with the data
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};
// Delete a report by its ID
exports.deleteReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    // Find the report by ID and delete it
    const report = await Report.findByIdAndDelete(reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found.' });
    }

    // Redirect back to the 'View All Reports' page after deletion
    res.redirect('/reports/view-all');
  } catch (error) {
    console.error('Error deleting report:', error.message);
    res.status(500).json({ message: 'Error deleting report', error: error.message });
  }
};

