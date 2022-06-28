import express from 'express';
const router = express.Router();

import {
  getPlanning,
  postOutputProd,
  postProdDefect,
  postHC,
  postRemark,
  findHcByid,
  findRemark,
  getPlanListLine,
  getOutputOneListNormal,
  getOutputOneListOt,
  getTotGood,
  getCountUndo,
  getLitDefAndVal,
  deleteGood,
  deleteDefectOut,
  getLitRejAndVal,
  postProdReject,
  getTotalReject,
  deleteReject,
} from '../../controllers/prodsewing/SewingOutput.js';
import {
  getRepDaySewing,
  getRepDaySewListLine,
  getRepDaySewListUnit,
  getRepSewingSummary,
} from '../../controllers/prodsewing/SewingOutReport.js';

router.get('/plan-line/:date/:unit', getPlanListLine);
router.get('/planoutput/:date/:unit', getPlanning);
router.get('/find-hc/:id', findHcByid);
router.get('/find-remark/:id', findRemark);

router.get('/findOneNormal/:date/:idnormal', getOutputOneListNormal);
router.get('/findOneOt/:date/:idOt', getOutputOneListOt);

router.patch('/undogood/:id', deleteGood);
router.patch('/undoreject/:id/:rejcode', deleteReject);
router.patch('/undodeffect/:id/:defcode', deleteDefectOut);

router.get('/output-good/:date/:id', getTotGood);
router.get('/output-deff/:id', getLitDefAndVal);
router.get('/output-reject/:id', getLitRejAndVal);
router.get('/output-count-undo/:id', getCountUndo);
router.get('/find-total-reject/:id', getTotalReject);

router.post('/sewing-output', postOutputProd);
router.post('/sewing-deffect', postProdDefect);
router.post('/sewing-reject', postProdReject);
router.post('/sewing-HC', postHC);
router.post('/sewing-remark', postRemark);

router.get('/report-day/:date/:unit', getRepDaySewing);
router.get('/report-line/:date/:unit', getRepDaySewListLine);
router.get('/report-unit/:date/:unit', getRepDaySewListUnit);

router.get('/report-day-sum/:date/:unit', getRepSewingSummary);
export default router;
