import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import { QueryLboDayRep } from '../../models/production/qcrDayRep.mod.js';

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
