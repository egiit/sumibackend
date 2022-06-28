import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import {
  QueryListLineSew,
  QueryListUnit,
  QuerySewDailyRep,
  QuerySummaryReport,
} from '../../models/production/SewingOutRep.mod.js';

// Get Daily Report Sewing Output
export const getRepDaySewing = async (req, res) => {
  try {
    const datarep = await db.query(QuerySewDailyRep, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(datarep);
  } catch (error) {
    res.json({ message: 'Data Report tidak ditemukan', error });
  }
};

// Get Daily Report Sewing List Line
export const getRepDaySewListLine = async (req, res) => {
  try {
    const listLine = await db.query(QueryListLineSew, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(listLine);
  } catch (error) {
    res.json({ message: 'Data Report List Line tidak ditemukan', error });
  }
};

// Get Daily Report Sewing List Unit
export const getRepDaySewListUnit = async (req, res) => {
  try {
    const listUnit = await db.query(QueryListUnit, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(listUnit);
  } catch (error) {
    res.json({ message: 'Data Report List Unit tidak ditemukan', error });
  }
};

// REPORT SUMMARY

// Get Daily Report Sewing Output
export const getRepSewingSummary = async (req, res) => {
  try {
    const datarep = await db.query(QuerySummaryReport, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(datarep);
  } catch (error) {
    res.json({ message: 'Data Report Sum tidak ditemukan', error });
  }
};
