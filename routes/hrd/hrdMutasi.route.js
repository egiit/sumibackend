import express from 'express';
import {
  getEmpByNik,
  getListKaryawanBySub,
  getListLineHrdMutasi,
  getListReqMutasi,
  postReqMutasi,
} from '../../controllers/hrd/HrdMutasi.js';

const router = express.Router();

router.get('/list-line/:unit', getListLineHrdMutasi);
router.get('/karyawans/:id', getListKaryawanBySub);
router.get('/karyawan/:nik', getEmpByNik);

router.get('/list-mutasi/:date', getListReqMutasi);

router.post('/karyawans/', postReqMutasi);
export default router;
