import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import {
  QueryEndLinePart,
  QueryEndLinePlan,
  QueryLboDayRep,
  QueryLboRepPart,
} from '../../models/production/qcrDayRep.mod.js';

// Get LBO Reports By Plan
export const getQcLboReports = async (req, res) => {
  try {
    const lboRep = await db.query(QueryLboDayRep, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(lboRep);
  } catch (error) {
    res.json({ message: 'Data Report LBO By Plan tidak ditemukan', error });
  }
};

// Get LBO Reports By Part
export const getQcLboReportsPart = async (req, res) => {
  try {
    const lboRep = await db.query(QueryLboRepPart, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(lboRep);
  } catch (error) {
    res.json({ message: 'Data Report LBO By Part tidak ditemukan', error });
  }
};

// Get EndLine Reports By Plan
export const getQcEndLinePlan = async (req, res) => {
  try {
    const endlineQc = await db.query(QueryEndLinePlan, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(endlineQc);
  } catch (error) {
    res.json({ message: 'Data Report Endline By Line tidak ditemukan', error });
  }
};

// Get EndLine Reports By Plan
export const getQcEndLinePart = async (req, res) => {
  try {
    const endlineQc = await db.query(QueryEndLinePart, {
      replacements: { date: req.params.date },
      type: QueryTypes.SELECT,
    });

    res.json(endlineQc);
  } catch (error) {
    res.json({ message: 'Data Report Endline By Part tidak ditemukan', error });
  }
};
