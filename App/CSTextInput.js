import React, { Component, PropTypes } from 'react'
import { Styles } from './Styles'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { getAttrModifier } from '../data/Validations'

export default CSTextInput = ({ text, value, textChange, isNumeric, addModifier = false}) => {
  getModifier = (addModifier, value) => {
    if(addModifier == true)
      return (<Text style={ Styles.attrmodifier }> { getAttrModifier(value) }</Text>)
  }
  return (<View style={ Styles.labelcontainer }>
            <Text style={ Styles.label }>{ text }</Text>
            <TextInput style={ Styles.text } placeholder={ text } value={ value } onChange={ textChange } keyboardType={ isNumeric ? "numeric" : "default"}/>
            { getModifier(addModifier, value) }
        </View>);
}