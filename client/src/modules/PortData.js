import React, { useState, useCallback, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Cookies from 'js-cookie';

import AppNavbar from "../components/AppNavbar";
import { getHeaders } from "../utils/requestUtils";

const PortData = () => {
    const [otp, setOtp] = useState(Math.floor(100000 + Math.random() * 900000));
    const [timer, setTimer] = useState(20);
    const timeOutCallback = useCallback(() => setTimer(currTimer => currTimer - 1), []);

    useEffect(() => {
        timer > 0 ? setTimeout(timeOutCallback, 1000) : invalidateOtp()
    }, [timer, timeOutCallback]);

    useEffect(() => {
        updateOtp();
    }, [otp])

    const invalidateOtp = async () => {
        try {
            const data = await axios({
                method: 'post',
                url: 'https://port-server.herokuapp.com/api/port/invalidateOtp',
                headers: getHeaders()
            })
        } catch (error) {
            Cookies.remove('name')
            Cookies.remove('token')
            navigator('/')
        }
    }

    const updateOtp = async () => {
        try {
            const data = await axios({
                method: 'post',
                url: 'https://port-server.herokuapp.com/api/port/updateOtp',
                data: {
                    otp
                },
                headers: getHeaders()
            })
        } catch (error) {
            Cookies.remove('name')
            Cookies.remove('token')
            navigator('/')
        }
    }

    const resetTimer = () => {
        if (!timer) {
            setTimer(20);
            setOtp(Math.floor(100000 + Math.random() * 900000))
        }
    };

    return (
        <div style={{ width: '500px' }}>
            <AppNavbar />
            <div style={{ backgroundColor: '#8475e3', paddingTop: '25%', height: '750px' }}>
                <h2>Steps to follow:</h2>
                <div className="countdown" style={{ paddingTop: "10px", fontSize: "18px", textAlign: 'left', paddingLeft: '10%' }}>
                    <ol>
                        <li> Visit https://port-data.herokuapp.com/validate-port on your new device</li>
                        <li> Enter the code shown below and click confirm</li>
                    </ol>
                    <h2 style={{ marginLeft: '25%' }}>{otp} {timer === 0 && (`(Expired)`)}</h2>
                    {timer > 0 ? <h5 style={{ marginLeft: '10%' }}>OTP Expires in {timer} seconds</h5> :
                        <Button style={{ marginLeft: '25%' }} onClick={resetTimer} >Reset Code</Button>}
                </div>
            </div>
        </div>

    );
}

export default PortData
