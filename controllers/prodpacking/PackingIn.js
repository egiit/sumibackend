import { QueryTypes, Op } from 'sequelize';

import db from '../../config/database.js';
import { QueryPackingIn } from '../../models/production/packingIn.mod.js';

// Get PackingIn
export const getPackingIn = async (req, res) => {
  try {
    const packin = await db.query(QueryPackingIn, {
      replacements: { date: req.params.date, unit: req.params.unit },
      type: QueryTypes.SELECT,
    });

    res.json(packin);
  } catch (error) {
    res.json({ message: 'Data Packing In tidak ditemukan', error });
  }
};
