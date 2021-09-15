import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as appJson from '../../app.json';
import { Button, Checkbox, Typography } from '../components/common';
import { View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Radiobutton from '../components/common/atoms/Radiobutton';

const appJson = {
    expo: {
        name: "mad-react-native-expo-template"
    }
}

export const onboardingStorageKey = `@onBoarding-${appJson.expo.name}`;
const config = [
    {
        inputName: "Text input example",
        inputType: "text"
    },
    {
        inputName: "Select input example",
        inputType: "select",
        values: ["Value1", "Value2", "Value3"]
    },
    {
        inputName: "Multiselect input example",
        inputType: "multiselect",
        values: ["Value1", "Value2", "Value3"]
    }
]

const OnBoardingScreen = (props:{navigation:any}) => {
    const [onboardingSettings, setOnboardingSettings] = useState(JSON.parse(JSON.stringify({})))

    const storeData = async (value:Object|null) => {
        try {
            if (value) {
                const valueToStore = JSON.stringify(value)
                console.log("Storing:", valueToStore)
                await AsyncStorage.setItem(onboardingStorageKey, valueToStore)

            } else {
                await AsyncStorage.removeItem(onboardingStorageKey);
            }
        } catch (e) {
          // saving error
        }
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem(onboardingStorageKey)
            if(value !== null) {
                console.log("Value found:", value)
                setOnboardingSettings({...JSON.parse(value)});
                //props.navigation.navigate("Root")
            }
        } catch(e) {
            // error reading value
        }
    }
    

    function setOnboardingValue(key:string,value:string|string[]) {
        let newOnboardingSettings = {...onboardingSettings};
        newOnboardingSettings[key] = value;
        if (newOnboardingSettings != onboardingSettings)
            setOnboardingSettings(newOnboardingSettings);
    }
    
    useEffect(() => {
        //storeData(null);
        getData();
    }, [])
    
    if (onboardingSettings == {}) return <></>
    console.log("Onboardingsettings:", onboardingSettings);  
    return <View style={{display:'flex', padding:20}}>
        {config.map(inputConfig => {
            if (inputConfig.inputType === 'text') {
                return <TextInput key={inputConfig.inputName} title={inputConfig.inputName} text={onboardingSettings[inputConfig.inputName]} callback={setOnboardingValue} />
            }
            if (inputConfig.values && inputConfig.inputType === 'select') {
                return <Select key={inputConfig.inputName} title={inputConfig.inputName} selectedValues={onboardingSettings[inputConfig.inputName] ? onboardingSettings[inputConfig.inputName]:[]} values={inputConfig.values} callback={setOnboardingValue} /> 
            }
            if (inputConfig.values && inputConfig.inputType === 'multiselect') {
                return <Select key={inputConfig.inputName} title={inputConfig.inputName} selectedValues={onboardingSettings[inputConfig.inputName] ? onboardingSettings[inputConfig.inputName]:''} values={inputConfig.values} callback={setOnboardingValue} multiselect/> 
            }
        })}
        <Button title="Submit" onPress={() => {storeData(onboardingSettings); props.navigation.replace("Root")}} />
    </View>
}

const TextInput = (props:{title:string, text:string, callback:CallableFunction}) => {
    return <View style={{paddingVertical:8}}>
        <Typography variant="h6">{props.title}</Typography>
        <input style={{padding:8, marginTop:8}} onChange={e => props.callback(props.title, e.target.value)} value={props.text}/>
    </View>
}

const Select = (props:{title:string, values:string[], selectedValues:string[], callback:CallableFunction, multiselect?:boolean}) => {
    return <View style={{paddingVertical:8}}>
        <Typography variant="h6">{props.title}</Typography>
        {props.values.map(value => <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', paddingVertical: 8}}>
            <Typography>{value}</Typography>
            {props.multiselect?
                <Checkbox checked={props.selectedValues.includes(value)} onValueChange={(checked:boolean) => {
                    let newSelectedValues = [...props.selectedValues];
                    if (checked)
                        newSelectedValues.push(value)
                    if (!checked)
                        newSelectedValues = newSelectedValues.filter(v => v !== value)
                    props.callback(props.title, newSelectedValues);
                }}/> : 
                <Radiobutton checked={props.selectedValues.includes(value)} onValueChange={(checked:boolean) => {
                    if (checked) {
                        props.callback(props.title, value);
                    }
                }}/>}
            </View>)}
    </View>
}

export default OnBoardingScreen;
