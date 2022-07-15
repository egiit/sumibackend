export const QueryLboDayRep = `SELECT B.PLAN_PROD_DATE TGL_PRODUKSI, C.LINE_PREF,  C.LINE_UNIT LINE_UNIT,  C.LINE_CODE, C.LINE_NAME_SPV, 
 C.LINE_ORDR, C.LINE_DESC, B.OUT_PLAN_ID,
B.PLAN_PROD_PART, G.PART_NAME, 
sum(N.QC_LBO_SS) ss,
   sum(N.Broken_Stitch) Broken_Stitch, 
   sum(N.Hanging_Thread) Hanging_Thread, 
   sum(N.Unbalance) Unbalance, 
   sum(N.Under_Size) Under_Size, 
   sum(N.Over_Size) Over_Size, 
   sum(N.Hole) Hole,
   sum(N.Dirty) Dirty, 
   sum(N.tot_def) tot_def,
   ROUND((sum(N.tot_def)/ sum(N.QC_LBO_SS))*1000000, 2) tot_ppm
FROM  plan_prod_daily_view_board B 
   LEFT JOIN qc_lbo_input_view N ON N.QC_LBO_DATE =  :date AND N.QC_LBO_PLAN_ID = B.OUT_PLAN_ID
   LEFT JOIN line C ON C.LINE_CODE = B.PLAN_PROD_LINE_CODE
   LEFT JOIN toy_part G ON G.PART_NUM = B.PLAN_PROD_PART
WHERE B.PLAN_PROD_DATE =  :date #AND B.OUT_PLAN_ID ='20220627001102842478O5' #AND LINE_UNIT ='MATTEL A' #LINE_DESC LIKE 'LINE 8'
GROUP BY B.OUT_PLAN_ID, B.PLAN_PROD_PART, G.PART_NAME`;

export const QueryLboRepPart = `SELECT N.QC_LBO_PART PARTN, G.PART_NAME, 
sum(N.QC_LBO_SS) ss,
  sum(N.Broken_Stitch) Broken_Stitch, 
  sum(N.Hanging_Thread) Hanging_Thread, 
  sum(N.Unbalance) Unbalance, 
  sum(N.Under_Size) Under_Size, 
  sum(N.Over_Size) Over_Size, 
  sum(N.Hole) Hole,
  sum(N.Dirty) Dirty, 
  sum(N.tot_def) tot_def,
  ROUND((sum(N.tot_def)/ sum(N.QC_LBO_SS))*1000000, 2) tot_ppm
FROM  qc_lbo_input_view N 
  LEFT JOIN toy_part G ON G.PART_NUM = N.QC_LBO_PART
WHERE N.QC_LBO_DATE = :date 
GROUP BY N.QC_LBO_PART, G.PART_NAME`;

export const QueryEndLinePlan = `SELECT B.PLAN_PROD_DATE TGL_PRODUKSI, C.LINE_PREF, C.LINE_UNIT LINE_UNIT, C.LINE_ORDR, C.LINE_CODE, C.LINE_DESC, C.LINE_NAME_SPV, B.OUT_PLAN_ID, B.PLAN_PROD_PART, G.PART_NAME, 
Broken_Stitch, Seam_Allowance, Overlock, Velcro, 
Felling, Missmatch, Hanging_thread,g.REJ_QTY Reject, Total_Defect, H.OUT_PROD_QTY good
FROM  plan_prod_daily_view_board B 
LEFT JOIN output_prod_defect_view N ON N.OUT_DEF_DATE BETWEEN :date AND :date AND N.OUT_PLAN_ID = B.OUT_PLAN_ID
LEFT JOIN line C ON C.LINE_CODE = B.PLAN_PROD_LINE_CODE
LEFT JOIN toy_part G ON G.PART_NUM = B.PLAN_PROD_PART
LEFT JOIN output_prod_good_daily H ON H.OUT_PROD_DATE BETWEEN :date AND :date AND B.OUT_PLAN_ID = H.OUT_PLAN_ID
LEFT JOIN (
SELECT XZ.OUT_PLAN_ID, SUM(XZ.OUT_REJ_QTY) REJ_QTY
FROM output_prod_reject XZ WHERE IFNULL(XZ.OUT_PROD_FLAG_DEL, '') <> 'D'
AND XZ.OUT_REJ_DATE = :date
GROUP BY XZ.OUT_PLAN_ID
) g ON B.OUT_PLAN_ID = g.OUT_PLAN_ID  
WHERE B.PLAN_PROD_DATE BETWEEN :date AND :date #AND B.OUT_PLAN_ID ='20220627001102842478O5' #AND LINE_UNIT ='MATTEL A' #LINE_DESC LIKE 'LINE 8'
GROUP BY B.OUT_PLAN_ID, B.PLAN_PROD_PART, G.PART_NAME`;

export const QueryEndLinePart = `SELECT NX.*,
IFNULL(Seam_Allowance, 0)+IFNULL(Broken_Stitch, 0)
+IFNULL(Overlock, 0)+IFNULL(Velcro, 0)
+IFNULL(Felling, 0)+IFNULL(Missmatch, 0)
+IFNULL(Hanging_Thread, 0) Total_Defect
 FROM (
 SELECT M.PARTN, O.PART_NAME, SUM(DEF_1) Broken_Stitch, SUM(DEF_2) Seam_Allowance, SUM(DEF_3) Overlock, SUM(DEF_4) Velcro, 
	SUM(DEF_5) Felling, SUM(DEF_6) Missmatch, SUM(DEF_7) Hanging_thread, SUM(DEF_8) Reject,
	 SUM(GOOD) good
	FROM(
		SELECT A.PARTN, 
			CASE WHEN A.OUT_DEF_CODE = '1' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_1,
			CASE WHEN A.OUT_DEF_CODE = '2' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_2,
			CASE WHEN A.OUT_DEF_CODE = '3' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_3,
			CASE WHEN A.OUT_DEF_CODE = '4' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_4,
			CASE WHEN A.OUT_DEF_CODE = '5' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_5,
			CASE WHEN A.OUT_DEF_CODE = '6' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_6,
			CASE WHEN A.OUT_DEF_CODE = '7' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_7, 
			CASE WHEN A.OUT_DEF_CODE = '8' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS DEF_8, 
			CASE WHEN A.OUT_DEF_CODE = '0' THEN IFNULL(SUM(A.OUT_DEF_QTY), 0) END  AS GOOD
		FROM (
			SELECT a.PARTN, a.OUT_DEF_CODE, SUM(DEF_QTY) OUT_DEF_QTY
			FROM (
				SELECT a.OUT_DEF_PART PARTN, a.OUT_DEF_CODE, SUM(a.OUT_DEF_QTY) DEF_QTY
				FROM output_prod_defect a 
				WHERE a.OUT_DEF_DATE BETWEEN :date AND :date AND
					IFNULL(a.OUT_PROD_FLAG_DEL,'') <> 'D' 
				GROUP BY a.OUT_DEF_PART,  a.OUT_DEF_CODE
				UNION ALL
				SELECT b.OUT_PROD_PART,0 OUT_DEF_CODE, SUM(b.OUT_PROD_QTY) 
				FROM output_prod_good b 
				WHERE b.OUT_PROD_DATE BETWEEN :date AND :date AND
					IFNULL(b.OUT_PROD_FLAG_DEL,'') <> 'D' 
				GROUP BY b.OUT_PROD_PART
				UNION ALL
				SELECT XZ.OUT_REJ_PART, 8 OUT_DEF_CODE, SUM(XZ.OUT_REJ_QTY) 
				FROM output_prod_reject XZ 
				WHERE  XZ.OUT_REJ_DATE BETWEEN :date AND :date AND
					IFNULL(XZ.OUT_PROD_FLAG_DEL, '') <> 'D'
				GROUP BY XZ.OUT_PLAN_ID
			) a GROUP BY a.PARTN, a.OUT_DEF_CODE
		)A
		GROUP BY A.PARTN, A.OUT_DEF_CODE
	) M LEFT JOIN toy_part O ON O.PART_NUM = M.PARTN
	GROUP BY  M.PARTN
)NX`;
