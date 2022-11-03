import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const PortValidation = () => {
    const [nickname, setNickname] = useState("");
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [uniqueIdentifier, setUniqueIdentifier] = useState(parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", "")))

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            Cookies.set('nickname', nickname);
            const response = await axios({
                method: 'post',
                url: 'https://port-server.herokuapp.com/api/port/validate',
                data: {
                    nickname,
                    newDeviceId: uniqueIdentifier,
                    otp
                }
            })
            if (response.data.isPorted) {
                Cookies.set('token', response.data.token)
                navigate('/home');
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className='mb-3'>Port Validation</h2>
            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="mb-3" style={{ width: '300px' }} >
                    <Form.Control type="text" required={true} onChange={(e) => setNickname(e.target.value)} placeholder="Enter your old device nickname" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Control type="text" required={true} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default PortValidation;
