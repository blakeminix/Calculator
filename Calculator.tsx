import React from 'react';
import { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = {
    title: string;
    children?: React.ReactNode;
  };

function Section({children, title}: SectionProps): React.JSX.Element {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {children}
      </View>
    );
}

let isResOperator = false;

function Calculator(): React.JSX.Element {
    const [displayValue, setDisplayValue] = useState('0');
    const [currentValue, setCurrentValue] = useState(0);
    const [operator, setOperator] = useState('');

    const handleButtonPress = (input: string) => {
        switch(input) {
            case '÷':
            case 'x':
            case '+':
            case '-':
                // If an operator is already set, calculate the result
                let result = 0;
                if (operator) {
                    if (operator === '÷') {
                        result = currentValue / parseFloat(displayValue);
                    } else if (operator === 'x') {
                        result = currentValue * parseFloat(displayValue);
                    } else if (operator === '+') {
                        result = currentValue + parseFloat(displayValue);
                    } else if (operator === '-') {
                        result = currentValue - parseFloat(displayValue);
                    }
                    setCurrentValue(result);
                    setDisplayValue(result.toString());
                } else {
                    setCurrentValue(parseFloat(displayValue));
                }
                 // Set the new operator
                 setOperator(input);
                 isResOperator = true;
                 break;
            case '=':
                // Calculate the result
                let result2 = 0;
                if (operator) {
                    if (operator === '÷') {
                        result2 = currentValue / parseFloat(displayValue);
                    } else if (operator === 'x') {
                        result2 = currentValue * parseFloat(displayValue);
                    } else if (operator === '+') {
                        result2 = currentValue + parseFloat(displayValue);
                    } else if (operator === '-') {
                        result2 = currentValue - parseFloat(displayValue);
                    }
                    setCurrentValue(0); // Reset current value
                    setOperator(''); // Reset operator
                    setDisplayValue(result2.toString());
                    isResOperator = true;
                }
                break;
            case 'C':
                // Clear the display and reset state
                setDisplayValue('0');
                setCurrentValue(0);
                setOperator('');
                break;
            default:
                // Append the input to the display value
                if (isResOperator) {
                    setDisplayValue(input);
                    isResOperator = false;
                } else {
                  if (input != '.') {
                    setDisplayValue(prevValue => prevValue === '0' ? input : prevValue + input);
                  } else {
                    setDisplayValue(prevValue => prevValue + input);
                  }
                }
                break;
        }
    };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section title="">
            <View style={styles.displayArea}>
                <Text style={styles.displayText}>{displayValue}</Text>
            </View>
            <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('C')}>
              <Text style={styles.buttonText}>C</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('(-)')}>
              <Text style={styles.buttonText}>(-)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('%')}>
              <Text style={styles.buttonText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('÷')}>
              <Text style={styles.buttonText}>÷</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('x')}>
              <Text style={styles.buttonText}>x</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('-')}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('+')}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.zeroButton} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('=')}>
              <Text style={styles.buttonText}>=</Text>
            </TouchableOpacity>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
      },
      buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      },
      button: {
        backgroundColor: '#2196F3',
        padding: 20,
        borderRadius: 20,
        width: '21%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 24,
      },
      zeroButton: {
        backgroundColor: '#2196F3',
        padding: 20,
        borderRadius: 20,
        width: '48%',
        alignItems: 'center',
      },
      displayArea: {
        backgroundColor: '#333',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'flex-end',
      },
      displayText: {
        color: 'white',
        fontSize: 32,
      },
});

export default Calculator;
