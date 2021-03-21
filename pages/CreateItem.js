import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

import Literals from '../utils/literals';
import {insertIntoTable} from '../utils/sql';

var db = openDatabase(Literals.DB_NAME);

const {
  ITEM_NAME,
  ITEM_SHORTHAND,
  ITEM_SYMPTOMS,
  ITEM_LIFESPAN_OPENED,
} = Literals;

const CreateItem = ({navigation}) => {
  let [itemName, setItemName] = useState('');
  let [itemSymptoms, setItemSymptoms] = useState('');
  let [itemLifespan, setItemLifespan] = useState('');
  let [itemShorthand, setItemShorthand] = useState('');

  let createItem = () => {
    console.log(itemName, itemShorthand, itemSymptoms, itemLifespan);

    const lifeSpanNumeric = parseInt(itemLifespan);

    // Validate the inputs
    if (!itemName || itemName.length > 20) {
      alert('Name Format incorrect');
      return;
    }
    if (!itemSymptoms || itemSymptoms.length > 255) {
      alert('Symptoms not entered or too long, only 255 characters allowed');
      return;
    }
    if (!itemLifespan || lifeSpanNumeric === NaN) {
      alert('Lifespan not entered or not a number');
      return;
    }

    const cols = [
      ITEM_NAME,
      ITEM_SHORTHAND,
      ITEM_SYMPTOMS,
      ITEM_LIFESPAN_OPENED,
    ];
    db.transaction(txn => {
      const sqlQuery = insertIntoTable(Literals.ITEM_TABLE, cols);
      console.log('the item create query', sqlQuery);
      txn.executeSql(
        sqlQuery,
        [itemName, itemShorthand, itemSymptoms, lifeSpanNumeric],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Item succesfully saved',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Failed to save Item');
          }
        },
        (tx, err) => {
          console.log('Failed to execute Query', tx);
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={itemName => setItemName(itemName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Shorthand"
                onChangeText={itemShorthand => setItemShorthand(itemShorthand)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Lifespan"
                onChangeText={itemLifespan => setItemLifespan(itemLifespan)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Symptoms"
                onChangeText={itemSymptoms => setItemSymptoms(itemSymptoms)}
                style={{padding: 10}}
              />
              <Mybutton title="Submit" customClick={createItem} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateItem;
