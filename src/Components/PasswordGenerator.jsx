import React, { useEffect, useState } from 'react'
import './PasswordGenerator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';

const uppercaseList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseList = "abcdefghijklmnopqrstuvwxyz";
const numberList = "0123456789";
const symbolList = "!@#$%^&*()-_+";

function PasswordGenerator() {
    const [password, setPassword] = useState('');
    const [upperCase, setUpperCase] = useState(true);
    const [lowerCase, setLowerCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [passwordLength, setPasswordLength] = useState(8);
    const [selectedOptions, setSelectedOptions] = useState(['uppercase', 'lowercase', 'numbers', 'symbols']);

    useEffect (() => {
        generatePassword();
    },[passwordLength]);

    const handleOptions = (type) => {
        let currentOptions = selectedOptions;
        if (currentOptions.includes(type)){
            const optionIndex = currentOptions.indexOf(type);
            currentOptions.splice(optionIndex, 1);
        }
        else {
            currentOptions.push(type);
        }
        setSelectedOptions(currentOptions);
    }

    const generatePassword = () => {

        let allowedList = '';

        if (upperCase){
            allowedList += uppercaseList;
        }
        if (lowerCase){
            allowedList += lowercaseList;
        }
        if (numbers){
            allowedList += numberList;
        }
        if (symbols){
            allowedList += symbolList;
        }
        
        const allowedListLength = allowedList.length;
        let finalPassword = '';

        for(let i = 0; i < passwordLength; i++){
            const passwordIndex = Math.round(Math.random() * allowedListLength);
            finalPassword += allowedList.charAt(passwordIndex);
        }

        setPassword(finalPassword);

    }

    const copyPassword = async () => {

        const copiedText = await navigator.clipboard.readText();

        if(password.length && password !== copiedText){
            navigator.clipboard.writeText(password);
            toast.success('Copied to clipboard', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }
    
    return (
        <>
            <div className='container'>
                <h2 className='title'>Password Generetor</h2>
                <div className="inputField">
                    <input type="text" className='inputText' placeholder='Click the Generate Password button' value={password} disabled />
                    <FontAwesomeIcon icon={faCopy} className='copyIcon' title='Copy' onClick={copyPassword}/>
                </div>
                <div className="settings">
                    <h4>Customize your password</h4>
                    <div className="options">
                        <div className="left-side">
                            <p>Password Length</p>
                            <div className="length">
                                <input type='number' min={4} max={40} className='length-box' value={passwordLength} onChange={(e) => setPasswordLength(e.currentTarget.value)}/>
                                <input type='range' min={4} max={40} className='length-range' value={passwordLength} onChange={(e) => setPasswordLength(e.currentTarget.value)}/>
                            </div>
                        </div>
                        <div className="right-side">
                            <div className="checkbox-field">
                                <input type="checkbox" id="uppercase" name="uppercase" disabled={selectedOptions.length === 1 && selectedOptions.includes('uppercase')} checked={upperCase} onChange={() => {setUpperCase(!upperCase); handleOptions('uppercase'); }}/>
                                <label htmlFor="uppercase">Uppercase <a>(ABC)</a></label>
                            </div>
                            <div className="checkbox-field">
                                <input type="checkbox" id="lowercase" name="lowercase" disabled={selectedOptions.length === 1 && selectedOptions.includes('lowercase')} checked={lowerCase} onChange={() => {setLowerCase(!lowerCase); handleOptions('lowercase'); }}/>
                                <label htmlFor="lowercase">Lowercase <a>(abc)</a></label>
                            </div>
                            <div className="checkbox-field">
                                <input type="checkbox" id="numbers" name="numbers" disabled={selectedOptions.length === 1 && selectedOptions.includes('numbers')} checked={numbers} onChange={() => {setNumbers(!numbers); handleOptions('numbers'); }}/>
                                <label htmlFor="numbers">Numbers <a>(0-9)</a></label>
                            </div>
                            <div className="checkbox-field">
                                <input type="checkbox" id="symbols" name="symbols" disabled={selectedOptions.length === 1 && selectedOptions.includes('symbols')} checked={symbols} onChange={() => {setSymbols(!symbols); handleOptions('symbols'); }}/>
                                <label htmlFor="symbols">Symbols <a>(!@#$%^&*()-_+)</a></label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="generate">
                    <button onClick={generatePassword}>Generate Password</button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default PasswordGenerator;