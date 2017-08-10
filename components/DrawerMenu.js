import React from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/DrawerMenuStyles";

export default (
  <View style={{ flex: 1 }}>
    <View style={styles.userBox}>
      <View style={styles.photo} />
      <Text style={styles.username}>Username!</Text>
    </View>

    <View>
      <TouchableWithoutFeedback>
        <View style={styles.buttonView}>
          <Text style={styles.button}>حساب کاربری</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.buttonView}>
          <Text style={styles.button}>درباره ما</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.buttonView}>
          <Text style={styles.button}>تنظیمات</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <View style={styles.buttonView}>
          <Text style={styles.button}>خروج</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </View>
);
