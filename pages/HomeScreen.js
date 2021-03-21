// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native

import React, {useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import {openDatabase} from 'react-native-sqlite-storage';

import Literals from '../utils/literals';
import {
  getTable,
  dropOnCondition,
  createOnCondition,
  generateInventoryDescription,
  generateItemDescription,
} from '../utils/sql';

console.log('DB NAME', Literals.DB_NAME);
var db = openDatabase(Literals.DB_NAME);

const HomeScreen = ({navigation}) => {
  /**
   *  @description The Homescreen is the first page in the Application flow
   *  and has to initialize the Databases on Mounting.
   */
  useEffect(() => {
    /* Initialize the Item Table */
    db.transaction(txn => {
      console.log('INIT');
      const tableQuery = getTable(Literals.ITEM_TABLE);
      txn.executeSql(tableQuery, [], (tx, res) => {
        console.log(res.rows.item(0));
        if (res.rows.length == 0) {
          console.log('RES');
          txn.executeSql(
            dropOnCondition(
              [Literals.COND_EXISTS, Literals.ITEM_TABLE].join(' '),
            ),
            [],
          );
          txn.executeSql(
            createOnCondition(
              Literals.COND_NOT_EXISTS,
              Literals.ITEM_TABLE,
              generateItemDescription(),
            ),
            [],
          );
        }
      });
    });
    /* Initialize the Inventory Table */
    db.transaction(txn => {
      txn.executeSql(getTable(Literals.INVENTORY_TABLE), [], (tx, res) => {
        console.log('init inventory');
        if (res.rows.length == 0) {
          console.log('no rows in inventory', res);
          const dropQuery = dropOnCondition(
            [Literals.COND_EXISTS, Literals.INVENTORY_TABLE].join(' '),
          );
          console.log('drop Query', dropQuery);
          txn.executeSql(dropQuery, []);
          const createQuery = createOnCondition(
            Literals.COND_NOT_EXISTS,
            Literals.INVENTORY_TABLE,
            generateInventoryDescription(),
          );
          console.log('create Query', createQuery);
          txn.executeSql(
            createQuery,
            [],
            (tx, res) => {
              console.log('Response', res);
            },
            (tx, err) => {
              console.log('Error creating table:', tx, err);
            },
          );
        }
      });
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="Grocery Watchlist" />
          <Mybutton
            title="Inventory"
            customClick={() => navigation.navigate('Inventory')}
          />
          <Mybutton
            title="Create Item"
            customClick={() => navigation.navigate('CreateItem')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
