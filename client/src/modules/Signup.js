import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Signup = () => {
    const [nickname, setNickname ] = useState("");
    const navigate = useNavigate();
    const [uniqueIdentifier, setUniqueIdentifier] = useState(parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(16).toString().replace(".", "")))

    const onSignUp = async (e) => {
        try{
            e.preventDefault();
            Cookies.set('nickname', nickname);
            const response = await axios({
                method: 'post',
                url: 'https://port-server.herokuapp.com/api/user/createUserData',
                data: {
                    nickname,
                    uniqueIdentifier
                }
              })
              if (response.status === 200){
                navigate('/home');
             }
             Cookies.set('token', response.data)

        }catch(error){
            console.log(error)
        }
    }

    return (
        <Form onSubmit={(e) => onSignUp(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nickname</Form.Label>
          <Form.Control type="text" required={true} onChange={(e) => setNickname(e.target.value)} placeholder="Enter any nickname" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
}

export default Signup;
