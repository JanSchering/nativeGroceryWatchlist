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

var db = openDatabase({name: Literals.DB_NAME});

const HomeScreen = ({navigation}) => {
  /**
   *  @description The Homescreen is the first page in the Application flow
   *  and has to initialize the Databases on Mounting.
   */
  useEffect(() => {
    /* Initialize the Item Table */
    db.transaction(function (txn) {
      txn.executeSql(getTable(Literals.ITEM_TABLE), [], function (tx, res) {
        if (res.rows.length == 0) {
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
    db.transaction(function (txn) {
      txn.executeSql(
        getTable(Literals.INVENTORY_TABLE),
        [],
        function (tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql(
              dropOnCondition(
                [Literals.COND_EXISTS, Literals.INVENTORY_TABLE].join(' '),
              ),
              [],
            );
            txn.executeSql(
              createOnCondition(
                Literals.COND_NOT_EXISTS,
                Literals.INVENTORY_TABLE,
                generateInventoryDescription(),
              ),
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <Mytext text="SQLite Example" />
          <Mybutton
            title="Items"
            customClick={() => navigation.navigate('Register')}
          />
          <Mybutton
            title="Update"
            customClick={() => navigation.navigate('Update')}
          />
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
          <Mybutton
            title="View All"
            customClick={() => navigation.navigate('ViewAll')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}>
          Example of SQLite Database in React Native
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
