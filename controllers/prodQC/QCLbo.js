import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import {
  QcLboInput,
  QcLboInputDetail,
  QueryFindDefect,
  QueryFindProcess,
  QueryFindTotalDetail,
  QueryGetListHeaderLbo,
  QueryPlaningLbo,
} from '../../models/production/qcLbo.mod.js';

// Get Planing Sewing Output
export const getPlanningQCLbo = async (req, res) => {
  try {
    const dataPlan = await db.query(QueryPlaningLbo, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(dataPlan);
  } catch (error) {
    res.json({ message: 'Data Planing LBO tidak ditemukan', error });
  }
};

// push data QC LBO
export const postQCLboHeader = async (req, res) => {
  try {
    const qcLboHeader = await QcLboInput.create(req.body);

    res.json({ message: 'Data Header LBO Tersimpan', data: qcLboHeader });
  } catch (error) {
    res.json({ message: 'Data Header LBO Tidak Tersimpan', error });
  }
};

// get data QC LBO Header
export const getQCLboHeader = async (req, res) => {
  try {
    const qcLboHeader = await db.query(QueryGetListHeaderLbo, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(qcLboHeader);
  } catch (error) {
    res.json({ message: 'Data Header LBO Tidak Ditemukan', error });
  }
};
// get data QC LBO Header
// export const getQCLboHeader = async (req, res) => {
//   try {
//     const qcLboHeader = await QcLboInput.findAll({
//       where: {
//         QC_LBO_PLAN_ID: req.params.id,
//       },
//     });

//     res.json(qcLboHeader);
//   } catch (error) {
//     res.json({ message: 'Data Header LBO Tidak Ditemukan', error });
//   }
// };

// Delete data QC LBO Header
export const deleteQCLboHeader = async (req, res) => {
  try {
    const findList = await QcLboInputDetail.findOne({
      where: {
        QC_LBO_ID: req.params.id,
      },
    });

    if (findList)
      await QcLboInputDetail.destroy({
        where: {
          QC_LBO_ID: req.params.id,
        },
      });

    const dataDelete = await QcLboInput.destroy({
      where: {
        QC_LBO_ID: req.params.id,
      },
    });

    res.json({ message: 'Data Header LBO Dihapus', dataDelete });
  } catch (error) {
    res.json({ message: 'Data Header LBO Tidak Terhapus', error });
  }
};

// Get Prcossess Qc LBP
export const getProccessList = async (req, res) => {
  try {
    const dataProces = await db.query(QueryFindProcess, {
      replacements: { partnum: req.params.partnum },
      type: QueryTypes.SELECT,
    });

    res.json(dataProces);
  } catch (error) {
    res.json({ message: 'Data Proccess Defect tidak ditemukan', error });
  }
};

// Get Defect List Qc LBP
export const getDefectList = async (req, res) => {
  try {
    const dataDefect = await db.query(QueryFindDefect, {
      type: QueryTypes.SELECT,
    });

    res.json(dataDefect);
  } catch (error) {
    res.json({ message: 'Data Defect List tidak ditemukan', error });
  }
};

// post data detail Lbo
export const postDataLboDetail = async (req, res) => {
  try {
    const dataPush = await QcLboInputDetail.create(req.body);
    res.json({ message: 'Data LBO Tersimpan', data: dataPush });
  } catch (error) {
    res.json({ message: 'Data LBO Tidak Tersimpan', error });
  }
};

// delete data LBO sebelumnya
export const deleteDataLboDetailById = async (req, res) => {
  try {
    const findDataLbo = await QcLboInputDetail.findOne({
      where: {
        QC_LBO_ID: req.params.id,
        LBO_CATEGORY: req.params.category,
      },
      order: [['LBO_DETAIL_ID', 'DESC']],
    });

    if (findDataLbo) {
      const dataDelete = await QcLboInputDetail.destroy({
        where: {
          LBO_DETAIL_ID: findDataLbo.LBO_DETAIL_ID,
        },
      });

      return res.json({ message: 'Satu Data LBO terhapus', data: dataDelete });
    }

    return res.json({ message: 'Data LBO ditemukan', data: findDataLbo });
  } catch (error) {
    res.json({ message: 'Data LBO Sebelumnya Tidak Terhapus', error });
  }
};

// Get Detail Data LBO
export const getTotalDetailLbo = async (req, res) => {
  try {
    const datatotDetail = await db.query(QueryFindTotalDetail, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(datatotDetail);
  } catch (error) {
    res.json({ message: 'Data Detail LBO tidak ditemukan', error });
  }
};
