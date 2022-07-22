import { QueryTypes, Op } from 'sequelize';
import sequelize from 'sequelize';
import db from '../../config/database.js';
import DB_HRD from '../../config/databaseHrd.js';
import {
  HrdMutasisReq,
  QueryGetEmpByNik,
  QueryKaryawansByLine,
  QueryLineMutasi,
  QueryListReqMutasi,
} from '../../models/hrd/hrdMutasi.mod.js';

// Get List Line HRD Mutasi
export const getListLineHrdMutasi = async (req, res) => {
  try {
    const dataListLine = await db.query(QueryLineMutasi, {
      replacements: { unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(dataListLine);
  } catch (error) {
    res.json({ message: 'Data List Line tidak ditemukan', error });
  }
};

// Get List Karyawan By
export const getListKaryawanBySub = async (req, res) => {
  try {
    const dataKaryawan = await DB_HRD.query(QueryKaryawansByLine, {
      replacements: { id_sub: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(dataKaryawan);
  } catch (error) {
    res.json({
      message: 'Data List Karyawan By Sub Dept Tidak ditemukan',
      error,
    });
  }
};

//Post Request Mutasi Karyawan dan Traning
export const postReqMutasi = async (req, res) => {
  try {
    const dataReq = await HrdMutasisReq.create(req.body);

    res.json({ message: 'Data Request Mutasi Tersimpan', data: dataReq });
  } catch (error) {
    res.json({
      message: 'Terdapat Masalah Saat Simpan Request Mutasi',
      error,
    });
  }
};

//get Record Mutasi Karyawan dan Traning
export const getListReqMutasi = async (req, res) => {
  try {
    const dataReqMutasis = await DB_HRD.query(QueryListReqMutasi, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(dataReqMutasis);
  } catch (error) {
    res.json({ message: 'Data Request Mutasi tidak ditemukan', error });
  }
};

//find Karyawan dan Traning by NIk
export const getEmpByNik = async (req, res) => {
  try {
    const dataEmp = await DB_HRD.query(QueryGetEmpByNik, {
      replacements: { nik: req.params.nik },
      type: QueryTypes.SELECT,
    });

    res.json(dataEmp);
  } catch (error) {
    res.json({ message: 'Data Karywan tidak ditemukan', error });
  }
};
