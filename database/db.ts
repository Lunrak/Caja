import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('caja.db');

export const initDatabase = () => {
	try {
		// Tabla de productos
		db.execSync(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        codigo_barras TEXT,
        cantidad INTEGER DEFAULT 0,
        precio_compra REAL DEFAULT 0,
        precio_venta REAL DEFAULT 0,
        imagen TEXT
      );
    `);
		console.log('Base de datos inicializada correctamente');
	} catch (error) {
		console.error('Error al inicializar la base de datos:', error);
	}
};
