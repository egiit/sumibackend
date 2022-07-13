export const QueryLboDayRep = `SELECT B.PLAN_PROD_DATE TGL_PRODUKSI,  C.LINE_UNIT LINE_UNIT,  C.LINE_CODE, C.LINE_NAME_SPV, 
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
