import { DataTypes } from 'sequelize';
// import db from '../../config/database';
import DB_HRD from '../../config/databaseHrd.js';

export const QueryLineMutasi = `SELECT a.LINE_ID_SUB_DEP id, a.LINE_DESC name FROM line a 
WHERE a.LINE_ID_SUB_DEP IS NOT NULL AND a.LINE_PREF LIKE :unit
ORDER BY a.LINE_PREF, a.LINE_ORDR`;

export const QueryKaryawansByLine = `SELECT c.*, d.nama sub_dept_name FROM (
	SELECT 'tetap' empl_flag, a.id id_karyawan, a.id_sub_departemen id_sub_dept, a.nik, a.nama, a.masuk tgl_masuk FROM karyawans a 
	WHERE a.id_sub_departemen = :id_sub AND a.status = 'aktif'
	UNION ALL
	SELECT 'traning' empl_flag, b.id id_karyawan, b.id_sub_dept, b.nik, b.nama, b.tgl_masuk FROM karyawans_tr b 
	WHERE b.id_sub_dept = :id_sub AND b.status = 'AKTIF'
) c 
LEFT JOIN sub_departemens d ON d.id = c. id_sub_dept`;

//model HRD Mutasi Req
export const HrdMutasisReq = DB_HRD.define(
  'mutasis_req',
  {
    id: {
      type: DataTypes.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    id_karyawan: { type: DataTypes.BIGINT },
    id_old_sub_departemen: { type: DataTypes.BIGINT },
    id_new_sub_departemen: { type: DataTypes.BIGINT },
    request_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    request_source: { type: DataTypes.STRING },
    approved: { type: DataTypes.INTEGER },
    approved_by: { type: DataTypes.BIGINT },
    add_id: { type: DataTypes.BIGINT },
    add_date: { type: DataTypes.DATE },
    mod_id: { type: DataTypes.BIGINT },
    mod_date: { type: DataTypes.DATE },
  },
  {
    freezeTableName: true,
    createdAt: 'add_date',
    updatedAt: 'mod_date',
  }
);

export const QueryListReqMutasi = `SELECT a.id id_req, a.id_karyawan, e.nik, e.nama, b.nama old_sub_name, c.nama new_sub_name, 
a.id_old_sub_departemen, a.id_new_sub_departemen, a.request_source, a.approved, a.request_date FROM mutasis_req a
LEFT JOIN(
	SELECT 'tetap' empl_flag, a.id id_karyawan, a.nik, a.nama FROM karyawans a 
	WHERE a.status = 'aktif'
	UNION ALL
	SELECT 'traning' empl_flag, b.id id_karyawan, b.nik, b.nama FROM karyawans_tr b 
	WHERE  b.status = 'AKTIF'
) e ON a.request_source = e.empl_flag AND a.id_karyawan = e.id_karyawan
LEFT JOIN sub_departemens b ON a.id_old_sub_departemen = b.id
LEFT JOIN sub_departemens c ON a.id_new_sub_departemen = c.id
WHERE DATE(a.request_date) = :date`;

export const QueryGetEmpByNik = `SELECT c.*, d.nama sub_dept_name FROM (
	SELECT 'tetap' empl_flag, a.id id_karyawan, a.id_sub_departemen id_sub_dept, a.nik, a.nama, a.masuk tgl_masuk FROM karyawans a 
	WHERE a.nik = :nik AND a.status = 'aktif'
	UNION ALL
	SELECT 'traning' empl_flag, b.id id_karyawan, b.id_sub_dept, b.nik, b.nama, b.tgl_masuk FROM karyawans_tr b 
	WHERE b.nik = :nik AND b.status = 'AKTIF' ) c 
LEFT JOIN sub_departemens d ON d.id = c. id_sub_dept`;
