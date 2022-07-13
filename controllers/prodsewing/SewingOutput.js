import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import {
  QueryFindNormal,
  QueryFindOt,
} from '../../models/production/sewingFindOutput.js';
import {
  QueryPlaning,
  OutprodGood,
  OutProdHC,
  OutprodDeffect,
  OutProdRemark,
  QueryPlaningLineList,
  QueryGood,
  QueryCountUndo,
  QueryDefListAndVal,
  QueryListRejAndVal,
  OutprodReject,
  QueryTotalReject,
} from '../../models/production/sewingOutput.mod.js';

// Get Planing Sewing Output
export const getPlanning = async (req, res) => {
  try {
    const dataPlan = await db.query(QueryPlaning, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(dataPlan);
  } catch (error) {
    res.json({ message: 'Data Planing tidak ditemukan', error });
  }
};

//get list line
export const getPlanListLine = async (req, res) => {
  try {
    const dataLIne = await db.query(QueryPlaningLineList, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(dataLIne);
  } catch (error) {
    res.json({ message: 'Data List Line tidak ditemukan', error });
  }
};

// push data produksi
export const postOutputProd = async (req, res) => {
  try {
    const outputProd = await OutprodGood.create(req.body);
    const findUndoQty = await OutProdHC.findOne({
      where: {
        PLAN_ID: req.body.OUT_PLAN_ID,
      },
    });

    if (!findUndoQty) {
      return res.status(400).json('Data Qty Undo ditemukan');
    }

    if (findUndoQty.OUT_PROD_GOOD_COUNT_DEL === null) {
      await OutProdHC.update(
        { OUT_PROD_GOOD_COUNT_DEL: 1 },
        {
          where: {
            PLAN_ID: req.body.OUT_PLAN_ID,
          },
        }
      );
    } else if (
      findUndoQty.OUT_PROD_GOOD_COUNT_DEL !== null &&
      findUndoQty.OUT_PROD_GOOD_COUNT_DEL < 3
    ) {
      await OutProdHC.update(
        { OUT_PROD_GOOD_COUNT_DEL: findUndoQty.OUT_PROD_GOOD_COUNT_DEL + 1 },
        {
          where: {
            PLAN_ID: req.body.OUT_PLAN_ID,
          },
        }
      );
    }
    res.json({ message: 'Data Output Tersimpan', data: outputProd });
  } catch (error) {
    res.json({ message: 'Data Output Tidak Tersimpan', error });
  }
};

// push data Deffect
export const postProdDefect = async (req, res) => {
  try {
    const dataDef = await OutprodDeffect.create(req.body);
    res.json({ message: 'Data Deffect Tersimpan', data: dataDef });
  } catch (error) {
    res.json({ message: 'Data Deffect Tidak Tersimpan', error });
  }
};

// push data HC
export const postHC = async (req, res) => {
  try {
    const findHc = await OutProdHC.findOne({
      where: { PLAN_ID: req.body.PLAN_ID },
    });

    if (!findHc) {
      const dataHC = await OutProdHC.create(req.body);
      return res.json({ message: 'Data HC Tersimpan', data: dataHC });
    }

    const dataHC = await OutProdHC.update(req.body, {
      where: { PLAN_ID: findHc.PLAN_ID },
    });
    return res.json({ message: 'Data HC di Update', data: dataHC });
  } catch (error) {
    res.json({ message: 'Data HC Tidak Tersimpan', error });
  }
};

// push data Remark
export const postRemark = async (req, res) => {
  try {
    const remarkData = await OutProdRemark.create(req.body);
    res.json({ message: 'Data Remark Tersimpan', data: remarkData });
  } catch (error) {
    res.json({ message: 'Data Remark Tidak Tersimpan', error });
  }
};

// Find One HC
export const findHcByid = async (req, res) => {
  try {
    const dataHC = await OutProdHC.findOne({
      where: {
        PLAN_ID: req.params.id,
      },
    });
    res.json(dataHC);
  } catch (error) {
    res.json({ message: 'Data HC Tidak Ditemukan', error });
  }
};

// Find One Remark
export const findRemark = async (req, res) => {
  try {
    const dataRemark = await OutProdRemark.findOne({
      where: {
        PLAN_ID: req.params.id,
      },
    });
    res.json(dataRemark);
  } catch (error) {
    res.json({ message: 'Data HC Tidak Ditemukan', error });
  }
};

//findListOutput by ID normal
export const getOutputOneListNormal = async (req, res) => {
  try {
    const dataOutputNormal = await db.query(QueryFindNormal, {
      replacements: { date: req.params.date, idnormal: req.params.idnormal },
      type: QueryTypes.SELECT,
    });

    res.json(dataOutputNormal);
  } catch (error) {
    res.json({ message: 'Data List tidak ditemukan ', error });
  }
};

//findListOutput by ID ot
export const getOutputOneListOt = async (req, res) => {
  try {
    const dataOutputot = await db.query(QueryFindOt, {
      replacements: { date: req.params.date, idOt: req.params.idOt },
      type: QueryTypes.SELECT,
    });

    res.json(dataOutputot);
  } catch (error) {
    res.json({ message: 'Data List tidak ditemukan', error });
  }
};

//find tootal Good
export const getTotGood = async (req, res) => {
  try {
    const dataTotGood = await db.query(QueryGood, {
      replacements: { date: req.params.date, id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(dataTotGood);
  } catch (error) {
    res.json({ message: 'Data Good ditemukan', error });
  }
};

//find list Deffect and Value
export const getLitDefAndVal = async (req, res) => {
  try {
    const listDeff = await db.query(QueryDefListAndVal, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(listDeff);
  } catch (error) {
    res.json({ message: 'Data Defect ditemukan', error });
  }
};
//find list Reject and Value
export const getLitRejAndVal = async (req, res) => {
  try {
    const listReject = await db.query(QueryListRejAndVal, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(listReject);
  } catch (error) {
    res.json({ message: 'Data Reject ditemukan', error });
  }
};

//find count undo
export const deleteGood = async (req, res) => {
  try {
    const lastGood = await OutprodGood.findOne({
      where: {
        OUT_PLAN_ID: req.params.id,
        OUT_PROD_FLAG_DEL: null,
      },
      order: [['OUT_PROD_ADD_DATE', 'DESC']],
    });

    if (!lastGood) {
      return res.json('Data Undo ditemukan');
    }

    const updateGood = await OutprodGood.update(
      { OUT_PROD_FLAG_DEL: 'D' },
      { where: { OUT_PROD_ID: lastGood.OUT_PROD_ID } }
    );

    const findUndoQty = await OutProdHC.findOne({
      where: {
        PLAN_ID: req.params.id,
      },
    });

    if (!findUndoQty) {
      return res.json('Data Qty Undo ditemukan');
    }

    if (findUndoQty.OUT_PROD_GOOD_COUNT_DEL === null) {
      await OutProdHC.update(
        { OUT_PROD_GOOD_COUNT_DEL: 2 },
        {
          where: {
            PLAN_ID: req.params.id,
          },
        }
      );
    } else if (
      findUndoQty.OUT_PROD_GOOD_COUNT_DEL !== null &&
      findUndoQty.OUT_PROD_GOOD_COUNT_DEL > 0
    ) {
      await OutProdHC.update(
        { OUT_PROD_GOOD_COUNT_DEL: findUndoQty.OUT_PROD_GOOD_COUNT_DEL - 1 },
        {
          where: {
            PLAN_ID: req.params.id,
          },
        }
      );
    }

    res.json({ message: 'Data Telah Di Undo', data: updateGood });
  } catch (error) {
    res.json({ message: 'Data Undo ditemukan', error });
  }
};

//find count undo
export const getCountUndo = async (req, res) => {
  try {
    const countUndo = await db.query(QueryCountUndo, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(countUndo);
  } catch (error) {
    res.json({ message: 'Data Undo ditemukan', error });
  }
};

//delete deffect

export const deleteDefectOut = async (req, res) => {
  try {
    const defUndo = await OutprodDeffect.findOne({
      where: {
        OUT_PLAN_ID: req.params.id,
        OUT_DEF_CODE: req.params.defcode,
        OUT_PROD_FLAG_DEL: null,
      },
      order: [['OUT_DEF_ADD_DATE', 'DESC']],
    });
    if (!defUndo) return res.json({ message: 'Data Undo Def tidak ditemukan' });

    const ekesusiDefUndo = await OutprodDeffect.update(
      { OUT_PROD_FLAG_DEL: 'D' },
      {
        where: {
          OUT_DEF_ID: defUndo.OUT_DEF_ID,
        },
      }
    );

    res.json({ message: 'Data Deffect Di Delete', data: ekesusiDefUndo });
  } catch (error) {
    res.json({ message: 'Data Undo ditemukan', error });
  }
};

// push data Reject
export const postProdReject = async (req, res) => {
  try {
    const dataReject = await OutprodReject.create(req.body);
    res.json({ message: 'Data Reject Tersimpan', data: dataReject });
  } catch (error) {
    res.json({ message: 'Data Deffect Tidak Tersimpan', error });
  }
};

//find tootal Reject
export const getTotalReject = async (req, res) => {
  try {
    const dataTotalReject = await db.query(QueryTotalReject, {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    });

    res.json(dataTotalReject);
  } catch (error) {
    res.json({ message: 'Data Reject ditemukan', error });
  }
};

//delete reject

export const deleteReject = async (req, res) => {
  try {
    const rejundo = await OutprodReject.findOne({
      where: {
        OUT_PLAN_ID: req.params.id,
        OUT_REJ_CODE: req.params.rejcode,
        OUT_PROD_FLAG_DEL: null,
      },
      order: [['OUT_REJ_ADD_DATE', 'DESC']],
    });
    if (!rejundo)
      return res.json({ message: 'Data Undo Reject tidak ditemukan' });

    const ekesusirejundo = await OutprodReject.update(
      { OUT_PROD_FLAG_DEL: 'D' },
      {
        where: {
          OUT_REJ_ID: rejundo.OUT_REJ_ID,
        },
      }
    );

    res.json({ message: 'DataReject Di Delete', data: ekesusirejundo });
  } catch (error) {
    res.json({ message: 'Data Undo tidak ditemukan', error });
  }
};
