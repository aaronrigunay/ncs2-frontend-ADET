import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet } from "react-native";
import { Colors } from "../constants/global-styles";

const ScoreInputCell = ({ value, onValueChange, maxScore = 10, style }) => {
  const [internalValue, setInternalValue] = useState(
    value === null ? "" : String(value)
  );

  useEffect(() => {
    const newValueString = value === null ? "" : String(value);
    if (newValueString !== internalValue) {
      setInternalValue(newValueString);
    }
  }, [value]);

  const handleChangeText = (text) => {
    setInternalValue(text);

    if (text === "") {
      onValueChange(null);
      return;
    }

    const numericValue = text.replace(/[^0-9]/g, "");

    if (numericValue === "") {
      onValueChange(null);
      return;
    }

    const num = parseInt(numericValue, 10);

    if (!isNaN(num) && num >= 0 && num <= maxScore) {
      onValueChange(num);
    } else if (isNaN(num)) {
      onValueChange(null);
    } else if (num < 0) {
      setInternalValue("0");
      onValueChange(0);
    } else if (num > maxScore) {
      setInternalValue(String(maxScore));
      onValueChange(maxScore);
    }
  };

  return (
    <TextInput
      style={[styles.input, style]}
      keyboardType="numeric"
      maxLength={String(maxScore).length === 1 && maxScore < 10 ? 1 : 2}
      onChangeText={handleChangeText}
      value={internalValue}
      textAlign="center"
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 2,
    marginHorizontal: 1,
    minWidth: 25,
    height: 25,
    backgroundColor: Colors.white,
    color: Colors.darkGrey,
    fontSize: 12,
    borderRadius: 2,
  },
});

export default ScoreInputCell;
