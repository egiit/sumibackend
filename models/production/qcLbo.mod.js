import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

export const QueryPlaningLbo = `SELECT REPLACE(CONCAT(CAST(NA.PLAN_PROD_DATE AS CHAR),
CAST(NA.PLAN_PROD_LINE_CODE AS CHAR),
CAST(NA.PLAN_PROD_PART AS CHAR),
CAST(NA.PLAN_PROD_FLAG AS CHAR),
CAST(NA.PLAN_PROD_GROUP AS CHAR)),'-','') PLAN_ID_NORMAL, 
REPLACE(CONCAT(CAST(NB.PLAN_PROD_DATE AS CHAR),
CAST(NB.PLAN_PROD_LINE_CODE AS CHAR),
CAST(NB.PLAN_PROD_PART AS CHAR),
CAST(NB.PLAN_PROD_FLAG AS CHAR),
CAST(NB.PLAN_PROD_GROUP AS CHAR)),'-','') PLAN_ID_OT, 
N.PLAN_PROD_WEEK, 
N.PLAN_PROD_DATE, 
N.PLAN_PROD_CONSLD,
N.PLAN_PROD_LINE_CODE,
LINE_UNIT, 
LINE_NAME_SPV,
LINE_DESC,
LINE_ORDR,
LINE_PREF,
N.PLAN_PROD_PART,
PART_NAME,
PART_TOY_SN,
N.PLAN_PROD_OPT,
N0.PART_FCH_BUYER PLAN_PROD_FCH,
N.PLAN_PROD_GROUP , 
NA.PLAN_PROD_EFF EFF_NORMAL,
NA.PLAN_PROD_WH WH_NORMAL, 
NA.PLAN_PROD_QTY QTY_NORMAL,
NB.PLAN_PROD_EFF EFF_OT, 
NC.OUT_PROD_GOOD_AHC A_HC, 
ND.OUT_PROD_GOOD_AHC A_HC_OT,
NB.PLAN_PROD_WH WH_OT, 
NB.PLAN_PROD_QTY QTY_OT,
NX.COUNT_CHECK
-- N3.OUT_PROD_QTY
FROM (
	SELECT DISTINCT 
	A.PLAN_PROD_WEEK, 
	A.PLAN_PROD_DATE, 
	A.PLAN_PROD_LINE_CODE,
	A.PLAN_PROD_PART, 		 
 	A.PLAN_PROD_CONSLD,
	A.PLAN_PROD_FCH,
	A.PLAN_PROD_OPT,
	#A.PLAN_PROD_ACT_HC A_HC,
	A.PLAN_PROD_GROUP 
	#A.PLAN_PROD_REF,
	FROM plan_prod_daily A WHERE A.PLAN_PROD_DATE = :date
) N 
LEFT JOIN plan_prod_daily NA ON NA.PLAN_PROD_WEEK = N.PLAN_PROD_WEEK AND
NA.PLAN_PROD_DATE = N.PLAN_PROD_DATE AND 
NA.PLAN_PROD_PART = N.PLAN_PROD_PART AND 
NA.PLAN_PROD_LINE_CODE = N.PLAN_PROD_LINE_CODE AND
NA.PLAN_PROD_FLAG = 'N' AND 
NA.PLAN_PROD_GROUP = N.PLAN_PROD_GROUP AND NA.PLAN_PROD_DATE = :date
LEFT JOIN plan_prod_daily NB ON NB.PLAN_PROD_WEEK = N.PLAN_PROD_WEEK AND 
NB.PLAN_PROD_DATE = N.PLAN_PROD_DATE AND 
NB.PLAN_PROD_PART = N.PLAN_PROD_PART AND 
NB.PLAN_PROD_LINE_CODE = N.PLAN_PROD_LINE_CODE AND
NB.PLAN_PROD_FLAG = 'O' AND
NB.PLAN_PROD_GROUP = N.PLAN_PROD_GROUP AND NB.PLAN_PROD_DATE = :date
LEFT JOIN output_prod_good_hc NC ON REPLACE(CONCAT(CAST(NA.PLAN_PROD_DATE AS CHAR),
CAST(NA.PLAN_PROD_LINE_CODE AS CHAR),
CAST(NA.PLAN_PROD_PART AS CHAR),
CAST(NA.PLAN_PROD_FLAG AS CHAR),
CAST(NA.PLAN_PROD_GROUP AS CHAR)),'-','') = NC.PLAN_ID
LEFT JOIN output_prod_good_hc ND ON REPLACE(CONCAT(CAST(NB.PLAN_PROD_DATE AS CHAR),
CAST(NB.PLAN_PROD_LINE_CODE AS CHAR),
CAST(NB.PLAN_PROD_PART AS CHAR),
CAST(NB.PLAN_PROD_FLAG AS CHAR),
CAST(NB.PLAN_PROD_GROUP AS CHAR)),'-','') = ND.PLAN_ID 
LEFT JOIN toy_part N0 ON N.PLAN_PROD_PART = PART_NUM
LEFT JOIN line N1 ON N.PLAN_PROD_LINE_CODE= LINE_CODE 
-- LEFT JOIN output_prod_good_daily N3 ON N3.OUT_PLAN_ID = REPLACE(CONCAT(CAST(NA.PLAN_PROD_DATE AS CHAR),
-- CAST(NA.PLAN_PROD_LINE_CODE AS CHAR),
-- CAST(NA.PLAN_PROD_PART AS CHAR),
-- CAST(NA.PLAN_PROD_FLAG AS CHAR),
-- CAST(NA.PLAN_PROD_GROUP AS CHAR)),'-','') AND N3.OUT_PROD_DATE =  :date
LEFT JOIN (
	SELECT a.QC_LBO_DATE, a.QC_LBO_PLAN_ID, COUNT(*) COUNT_CHECK FROM qc_lbo_input a 
	WHERE  a.QC_LBO_DATE = :date
	GROUP BY a.QC_LBO_DATE, a.QC_LBO_PLAN_ID
) NX ON REPLACE(CONCAT(CAST(NA.PLAN_PROD_DATE AS CHAR),
CAST(NA.PLAN_PROD_LINE_CODE AS CHAR),
CAST(NA.PLAN_PROD_PART AS CHAR),
CAST(NA.PLAN_PROD_FLAG AS CHAR),
CAST(NA.PLAN_PROD_GROUP AS CHAR)),'-','') = NX.QC_LBO_PLAN_ID
WHERE LINE_PREF LIKE :unit
ORDER BY  LINE_PREF, LINE_ORDR, N.PLAN_PROD_LINE_CODE, LINE_UNIT,  N.PLAN_PROD_GROUP`;

//model qcLboHeader
export const QcLboInput = db.define(
  'qc_lbo_input',
  {
    QC_LBO_ID: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    QC_LBO_DATE: { type: DataTypes.DATEONLY },
    QC_LBO_PLAN_ID: { type: DataTypes.STRING },
    QC_LBO_TIME: { type: DataTypes.TIME },
    QC_LBO_PART: { type: DataTypes.STRING },
    QC_LBO_HOUR_TARGET: { type: DataTypes.DOUBLE },
    QC_LBO_SS: { type: DataTypes.DOUBLE },
    QC_LBO_ADD_ID: { type: DataTypes.INTEGER },
    QC_LBO_MOD_ID: { type: DataTypes.INTEGER },
    QC_LBO_ADD_TIME: { type: DataTypes.DATE },
    QC_LBO_MOD_TIME: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'QC_LBO_ADD_TIME',
    updatedAt: 'QC_LBO_MOD_TIME',
  }
);

//model qcLbo Detail
export const QcLboInputDetail = db.define(
  'qc_lbo_input_detail',
  {
    LBO_DETAIL_ID: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    QC_LBO_ID: { type: DataTypes.BIGINT },
    LBO_CATEGORY: { type: DataTypes.STRING },
    LBO_SEQUENCE: { type: DataTypes.INTEGER },
    LBO_PROCESS_ID: { type: DataTypes.BIGINT },
    LBO_DEFECT_CODE: { type: DataTypes.BIGINT },
    LBO_XY_AXIS: { type: DataTypes.STRING },
    LBO_STATUS: { type: DataTypes.STRING },
    LBO_ADD_ID: { type: DataTypes.BIGINT },
    LBO_MOD_ID: { type: DataTypes.BIGINT },
    LBO_ADD_TIME: { type: DataTypes.DATE },
    LBO_MOD_TIME: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'LBO_ADD_TIME',
    updatedAt: 'LBO_MOD_TIME',
  }
);

export const QueryFindProcess = `SELECT A.CBSD_ID,  A.CBSD_PROC_DESC FROM toy_part_cbsd A WHERE A.CBSD_PART_NUM = :partnum`;
export const QueryFindDefect = `SELECT *  FROM defect_lbo A WHERE A.DEFECT_CODE`;
export const QueryFindTotalDetail = `SELECT N.LBO_CATEGORY, COUNT(N.LBO_CATEGORY) JUMLAH FROM 
(
SELECT A.LBO_DETAIL_ID, A.QC_LBO_ID, A.LBO_CATEGORY FROM qc_lbo_input_detail A WHERE A.QC_LBO_ID = :id
) N
GROUP BY N.LBO_CATEGORY`;

export const QueryGetListHeaderLbo = `SELECT  A.QC_LBO_ID, A.QC_LBO_DATE, A.QC_LBO_TIME, A.QC_LBO_PLAN_ID, A.QC_LBO_PART, A.QC_LBO_SS, A.QC_LBO_HOUR_TARGET, 
B.Broken_Stitch,
B.Hanging_Thread,
B.Unbalance,
B.Under_Size,
B.Over_Size,
B.Hole,
B.Dirty,
B.tot_def,
(B.tot_def / B.QC_LBO_SS)*1000000 ppm
FROM qc_lbo_input A 
LEFT JOIN qc_lbo_input_view B ON A.QC_LBO_ID = B.QC_LBO_ID
WHERE A.QC_LBO_PLAN_ID = :id `;
