const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
// Route to show the create report form
router.get('/create', reportController.showCreateReportForm);

// Create report (handle form submission)
router.post('/create', reportController.createPatientReport);
// Route to fetch all reports
router.get('/all', reportController.fetchAllReports);

// View all reports (This handles the base /reports path)
router.get('/view-all', reportController.renderAllReportsPage);

// View reports for a specific patient
router.get('/view/:patientId', reportController.viewReportsByPatient);
// Add this route for deleting a report
router.post('/delete/:reportId', reportController.deleteReport);


module.exports = router;
