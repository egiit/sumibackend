import express from 'express';
const router = express.Router();
import {
  deleteDataLboDetailById,
  deleteQCLboHeader,
  getDefectList,
  getPlanningQCLbo,
  getProccessList,
  getQCLboHeader,
  getTotalDetailLbo,
  postDataLboDetail,
  postQCLboHeader,
} from '../../controllers/prodQC/QCLbo.js';
import {
  getQcEndLinePart,
  getQcEndLinePlan,
  getQcLboReports,
  getQcLboReportsPart,
} from '../../controllers/prodQC/QcDayReports.js';

router.get('/qc-lbo/header/:id', getQCLboHeader);
router.get('/qc-lbo/:date/:unit', getPlanningQCLbo);
router.get('/qc-lbo-proccess/:partnum', getProccessList);
router.get('/qc-lbo-defect-list', getDefectList);
router.get('/qc-lbo-defect-detail/:id', getTotalDetailLbo);

router.delete('/qc-lbo-detail/:id/:category', deleteDataLboDetailById);
router.delete('/qc-lbo/header/:id', deleteQCLboHeader);

router.post('/qc-lbo', postQCLboHeader);
router.post('/qc-lbo-detail', postDataLboDetail);

// report
router.get(`/qc-day-report/lbo-plan/:date`, getQcLboReports);
router.get(`/qc-day-report/lbo-part/:date`, getQcLboReportsPart);

router.get(`/qc-day-report/endline-plan/:date`, getQcEndLinePlan);
router.get(`/qc-day-report/endline-part/:date`, getQcEndLinePart);

export default router;
