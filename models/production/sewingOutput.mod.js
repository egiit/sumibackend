import { DataTypes } from 'sequelize';
import db from '../../config/database.js';

//module outprodGood
export const OutprodGood = db.define(
  'output_prod_good',
  {
    OUT_PROD_ID: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    OUT_PLAN_ID: { type: DataTypes.STRING },
    OUT_PROD_DATE: { type: DataTypes.DATEONLY },
    OUT_PROD_PART: { type: DataTypes.STRING },
    OUT_PROD_TIME: { type: DataTypes.TIME },
    OUT_PROD_QTY: { type: DataTypes.DOUBLE },
    OUT_PROD_ACT_HC: { type: DataTypes.INTEGER(11) },
    OUT_PROD_CONSLD: { type: DataTypes.INTEGER(11) },
    OUT_PROD_TYPE: { type: DataTypes.STRING },
    OUT_PROD_FLAG_DEL: { type: DataTypes.STRING },
    OUT_PROD_UNIT: { type: DataTypes.STRING },
    OUT_PROD_LINE_CODE: { type: DataTypes.STRING },
    OUT_PROD_LINE_DESC: { type: DataTypes.STRING },
    OUT_PORD_LINE_SPV: { type: DataTypes.STRING },
    OUT_PROD_ADD_ID: { type: DataTypes.INTEGER },
    OUT_PROD_ADD_DATE: { type: DataTypes.DATE },
    OUT_PROD_MOD_ID: { type: DataTypes.INTEGER },
    OUT_PROD_MOD_DATE: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'OUT_PROD_ADD_DATE',
    updatedAt: 'OUT_PROD_MOD_DATE',
  }
);

export const OutprodDeffect = db.define(
  'output_prod_defect',
  {
    OUT_DEF_ID: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    OUT_PLAN_ID: { type: DataTypes.STRING },
    OUT_DEF_DATE: { type: DataTypes.DATEONLY },
    OUT_DEF_PART: { type: DataTypes.STRING },
    OUT_DEF_CODE: { type: DataTypes.INTEGER },
    OUT_DEF_QTY: { type: DataTypes.DOUBLE },
    OUT_DEF_ACT_HC: { type: DataTypes.INTEGER },
    OUT_DEF_CONSLD: { type: DataTypes.INTEGER },
    OUT_DEF_TIME: { type: DataTypes.TIME },
    OUT_DEF_TYPE: { type: DataTypes.STRING },
    OUT_DEF_UNIT: { type: DataTypes.STRING },
    OUT_DEF_LINE_CODE: { type: DataTypes.STRING },
    OUT_DEF_LINE_DESC: { type: DataTypes.STRING },
    OUT_DEF_LINE_SPV: { type: DataTypes.STRING },
    OUT_DEF_ADD_ID: { type: DataTypes.BIGINT(20) },
    OUT_DEF_ADD_DATE: { type: DataTypes.DATE },
    OUT_DEF_MOD_ID: { type: DataTypes.BIGINT(20) },
    OUT_DEF_MOD_DATE: { type: DataTypes.DATE },
    OUT_PROD_FLAG_DEL: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: 'OUT_DEF_ADD_DATE',
    updatedAt: 'OUT_DEF_MOD_DATE',
  }
);

export const OutProdHC = db.define(
  'output_prod_good_hc',
  {
    PLAN_ID: { type: DataTypes.STRING },
    OUT_PROD_GOOD_AHC: { type: DataTypes.DOUBLE },
    OUT_PROD_GOOD_COUNT_DEL: { type: DataTypes.INTEGER },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

OutProdHC.removeAttribute('id');

export const OutProdRemark = db.define(
  'prod_remark',
  {
    PLAN_ID: { type: DataTypes.STRING },
    REMARK: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

OutProdRemark.removeAttribute('id');

export const QueryPlaningLineList = `SELECT DISTINCT 
A.PLAN_PROD_WEEK, 
A.PLAN_PROD_DATE, 
A.PLAN_PROD_LINE_CODE, 
B.LINE_PREF,
B.LINE_DESC,
B.LINE_NAME_SPV,
B.LINE_ORDR
FROM plan_prod_daily A 
LEFT JOIN line B ON A.PLAN_PROD_LINE_CODE = B.LINE_CODE
WHERE A.PLAN_PROD_DATE = :date AND B.LINE_PREF LIKE :unit
ORDER BY B.LINE_ORDR`;

export const QueryPlaning = `SELECT REPLACE(CONCAT(CAST(NA.PLAN_PROD_DATE AS CHAR),
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
NB.PLAN_PROD_QTY QTY_OT 

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
NA.PLAN_PROD_GROUP = N.PLAN_PROD_GROUP
LEFT JOIN plan_prod_daily NB ON NB.PLAN_PROD_WEEK = N.PLAN_PROD_WEEK AND 
NB.PLAN_PROD_DATE = N.PLAN_PROD_DATE AND 
NB.PLAN_PROD_PART = N.PLAN_PROD_PART AND 
NB.PLAN_PROD_LINE_CODE = N.PLAN_PROD_LINE_CODE AND
NB.PLAN_PROD_FLAG = 'O' AND
NB.PLAN_PROD_GROUP = N.PLAN_PROD_GROUP  
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
WHERE LINE_PREF LIKE :unit
ORDER BY  LINE_PREF, LINE_ORDR, N.PLAN_PROD_LINE_CODE, LINE_UNIT,  N.PLAN_PROD_GROUP`;

export const QueryGood = `SELECT SUM(OUT_PROD_QTY) AS  GOOD FROM output_prod_good WHERE OUT_PROD_DATE= :date 
 AND OUT_PLAN_ID = :id AND IFNULL(OUT_PROD_FLAG_DEL, TRUE) = TRUE `;

export const QueryCountUndo = `SELECT * FROM output_prod_good_hc A WHERE A.PLAN_ID =:id `;

export const QueryDefListAndVal = `SELECT B.DEFECT_CODE, B.DEFECT_NAME, N.* FROM defect B
LEFT JOIN (
	SELECT A.OUT_PLAN_ID, A.OUT_DEF_CODE, SUM(A.OUT_DEF_QTY) TOT_DEFF
	FROM output_prod_defect A 
	WHERE A.OUT_PLAN_ID = :id 
  AND IFNULL(OUT_PROD_FLAG_DEL, TRUE) = TRUE
	GROUP BY A.OUT_PLAN_ID, A.OUT_DEF_CODE
) N ON B.DEFECT_CODE = N.OUT_DEF_CODE`;

export const QueryListRejAndVal = `SELECT B.REJECT_CODE, B.REJECT_NAME, N.* FROM list_reject B
LEFT JOIN (
	SELECT A.OUT_PLAN_ID, A.OUT_REJ_CODE, SUM(A.OUT_REJ_QTY) TOT_REJECT
	FROM output_prod_reject A 
	WHERE A.OUT_PLAN_ID = :id AND  IFNULL(OUT_PROD_FLAG_DEL, TRUE) = TRUE
	GROUP BY A.OUT_PLAN_ID, A.OUT_REJ_CODE
) N ON B.REJECT_CODE = N.OUT_REJ_CODE`;

export const OutprodReject = db.define(
  'output_prod_reject',
  {
    OUT_REJ_ID: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    OUT_PLAN_ID: { type: DataTypes.STRING },
    OUT_REJ_DATE: { type: DataTypes.DATEONLY },
    OUT_REJ_PART: { type: DataTypes.STRING },
    OUT_REJ_CODE: { type: DataTypes.INTEGER },
    OUT_REJ_QTY: { type: DataTypes.DOUBLE },
    OUT_REJ_ACT_HC: { type: DataTypes.INTEGER },
    OUT_REJ_CONSLD: { type: DataTypes.INTEGER },
    OUT_REJ_TIME: { type: DataTypes.TIME },
    OUT_REJ_TYPE: { type: DataTypes.STRING },
    OUT_REJ_UNIT: { type: DataTypes.STRING },
    OUT_REJ_LINE_CODE: { type: DataTypes.STRING },
    OUT_REJ_LINE_DESC: { type: DataTypes.STRING },
    OUT_REJ_LINE_SPV: { type: DataTypes.STRING },
    OUT_REJ_ADD_ID: { type: DataTypes.BIGINT(20) },
    OUT_REJ_ADD_DATE: { type: DataTypes.DATE },
    OUT_REJ_MOD_ID: { type: DataTypes.BIGINT(20) },
    OUT_REJ_MOD_DATE: { type: DataTypes.DATE },
    OUT_PROD_FLAG_DEL: { type: DataTypes.STRING },
  },
  {
    freezeTableName: true,
    createdAt: 'OUT_REJ_ADD_DATE',
    updatedAt: 'OUT_REJ_MOD_DATE',
  }
);

export const QueryTotalReject = ` SELECT SUM(A.OUT_REJ_QTY) TOTAL_REJECT FROM output_prod_reject A 
WHERE A.OUT_PLAN_ID = :id AND IFNULL(A.OUT_PROD_FLAG_DEL, TRUE) = TRUE`;
