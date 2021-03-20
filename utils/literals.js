const DB_NAME = 'Groceries.db';

/* SQL Tables */
const INVENTORY_TABLE = 'table_inventory';
const ITEM_TABLE = 'table_item';

/* SQL Column Names */
const ITEM_ID = 'item_id';
const ITEM_NAME = 'item_name';
const ITEM_SHORTHAND = 'item_shorthand';
const ITEM_SYMPTOMS = 'item_symptoms';
const ITEM_LIFESPAN_OPENED = 'item_lifespan_opened';
const INVENTORY_ID = 'inventory_id';
const INVENTORY_ITEM_ID = 'inventory_item_id'; // External key to Item
const INVENTORY_OPENING_TIME = 'inventory_opening_time';

/* SQL CONDITIONS */
const COND_EXISTS = 'EXISTS';
const COND_NOT_EXISTS = 'NOT EXISTS';
const COND_REFERENCES = 'REFERENCES';

/* SQL Types */
const SQL_VARCHAR3 = 'VARCHAR(3)';
const SQL_VARCHAR20 = 'VARCHAR(20)';
const SQL_VARCHAR255 = 'VARCHAR(255)';
const SQL_INT10 = 'INT(10)';
const SQL_INTEGER = 'INTEGER';
const SQL_DATETIME = 'DATETIME';

/* SQL Attributes */
const SQL_PRIME_KEY = 'PRIMARY KEY';
const SQL_FOREIGN_KEY = 'FOREIGN KEY';
const SQL_AUTO_INCREMENT = 'AUTOINCREMENT';

export default {
  DB_NAME,
  INVENTORY_TABLE,
  INVENTORY_ID,
  INVENTORY_ITEM_ID,
  INVENTORY_OPENING_TIME,
  ITEM_TABLE,
  ITEM_ID,
  ITEM_NAME,
  ITEM_SHORTHAND,
  ITEM_SYMPTOMS,
  ITEM_LIFESPAN_OPENED,
  COND_EXISTS,
  COND_NOT_EXISTS,
  COND_REFERENCES,
  SQL_VARCHAR3,
  SQL_VARCHAR20,
  SQL_VARCHAR255,
  SQL_INT10,
  SQL_INTEGER,
  SQL_DATETIME,
  SQL_PRIME_KEY,
  SQL_FOREIGN_KEY,
  SQL_AUTO_INCREMENT,
};
