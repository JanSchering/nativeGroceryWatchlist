import React, {useState, useEffect} from 'react';
import {FlatList, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import Literals from '../utils/literals';
import {getAllFromTable, getSpecificFromTable} from '../utils/sql';

var db = openDatabase(Literals.DB_NAME);
console.log(db);

const ViewInventory = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(txn => {
      console.log('init inventory page');
      // Get all entries from the Inventory
      const sqlQuery = getAllFromTable(Literals.INVENTORY_TABLE);
      console.log('The Query', sqlQuery);
      txn.executeSql(
        sqlQuery,
        [],
        (tx, results) => {
          console.log('Results', results);
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            const entry = results.rows.item(i);
            //for each entry, get the name of the related Item from the DB
            const matchCondition = `${Literals.ITEM_ID} = ${
              entry[Literals.INVENTORY_ITEM_ID]
            }`;
            txn.executeSql(
              getSpecificFromTable(
                Literals.ITEM_TABLE,
                Literals.ITEM_NAME,
                matchCondition,
              ),
              [],
              (tx, entries) => {
                console.log('entries', entries);
              },
            );
            temp.push(entry);
          }
          setFlatListItems(temp);
        },
        (tx, err) => {
          console.log('Error executing', err, tx);
        },
      );
    });
  }, []);

  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };

  let listItemView = item => {
    return (
      <View
        key={item.inventory_id}
        style={{backgroundColor: 'white', padding: 20}}>
        <Text>Id: {item[Literals.INVENTORY_ID]}</Text>
        <Text>Opening Date: {item[Literals.INVENTORY_OPENING_TIME]}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewInventory;
