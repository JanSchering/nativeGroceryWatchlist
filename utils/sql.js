import Literals from './literals';

export const getTable = name => {
  return `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}'`;
};

export const dropOnCondition = condition => {
  return `DROP TABLE IF ${condition}`;
};

/**
 * @param {object[]} columns - Should be of form
 * [
 *  {
 *    name: ...,
 *    type: ...,
 *    ...
 *  },
 * ...
 * ]
 */
export const createOnCondition = (condition, name, columns) => {
  var tableDescription = columns.reduce((accumulator, curr) => {
    newCol = Object.values(curr).join(' ');
    accumulator.split('').length > 0
      ? (accumulator += `, ${newCol}`)
      : (accumulator = newCol);
    return accumulator;
  }, '');
  return `CREATE TABLE IF ${condition} ${name}(${tableDescription})`;
};

/**
 * @param {string} keyName - The name of the key in the new Table.
 * @param {string} sourceTable - The name of the source Table that
 *  the key originates from
 * @param {string} sourceColumn - The original name of the column/key
 * @example
 *  var makeForeignKey = addForeignKey(trackartist, artist, artistid);
 *  makeForeignKey === FOREIGN KEY(trackartist) REFERENCES artist(artistid)
 */
export const addForeignKey = (keyName, sourceTable, sourceColumn) => {
  return `FOREIGN KEY (${keyName}) REFERENCES ${sourceTable}(${sourceColumn})`;
};

/**
 * @description Generates an object that describes the INVENTORY Table
 */
export const generateInventoryDescription = () => {
  return [
    {
      name: Literals.INVENTORY_ID,
      type: Literals.SQL_INTEGER,
      key: Literals.SQL_PRIME_KEY,
      increment: Literals.SQL_AUTO_INCREMENT,
    },
    {
      key: addForeignKey(
        Literals.INVENTORY_ITEM_ID,
        Literals.ITEM_TABLE,
        Literals.ITEM_ID,
      ),
    },
    {
      name: Literals.INVENTORY_OPENING_TIME,
      type: Literals.SQL_DATETIME,
    },
  ];
};

/**
 * @description Generates an object that describes the ITEM Table
 */
export const generateItemDescription = () => {
  return [
    {
      name: Literals.ITEM_ID,
      type: Literals.SQL_INTEGER,
      key: Literals.SQL_PRIME_KEY,
      increment: Literals.SQL_AUTO_INCREMENT,
    },
    {
      name: Literals.ITEM_NAME,
      type: Literals.SQL_VARCHAR20,
    },
    {
      name: Literals.ITEM_SHORTHAND,
      type: Literals.SQL_VARCHAR3,
    },
    {
      name: Literals.ITEM_SYMPTOMS,
      type: Literals.SQL_VARCHAR255,
    },
    {
      name: Literals.ITEM_LIFESPAN_OPENED,
      type: Literals.SQL_INTEGER,
    },
  ];
};
