import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

import { getHeaders } from "../utils/requestUtils";
import AppNavbar from "../components/AppNavbar";

const Home = () => {
    const [conversation, setConversation] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigator = useNavigate();
    const name = Cookies.get('nickname');

    useEffect(() => {
        getConversation();
    }, [])

    const getConversation = async () => {
        setLoading(true)
        try {
            const response = await axios({
                method: 'get',
                url: 'https://port-server.herokuapp.com/api/conversation/getConversation',
                headers: getHeaders()
            })
            if (response.status === 200) {
                setConversation(response.data)
            }
        } catch (error) {
            Cookies.remove('name')
            Cookies.remove('token')
            navigator('/')
        }
        setLoading(false);
    }

    const conversationTemplate = (convo) => {
        const emoji = convo.from === 'bot' ? "🤖" : "😃";
        return (
            <div style={{ marginBottom: '20px' }}>
                <Row>
                    <Col md={4}><h6>{emoji}&nbsp;{convo.from}:-</h6></Col>
                    <Col> <h6>{convo.body}</h6></Col>
                </Row>
            </div>
        )
    }

    return (
        <div style={{ width: '500px' }}>
            <AppNavbar />
            <div style={{ textAlign: 'left', backgroundColor: '#8475e3', padding: '60px', height: '750px' }}>
                <h1 style={{ textAlign: 'center', paddingBottom: '50px' }}>Welcome {name}</h1>
                {!loading ? conversation.map(each => conversationTemplate(each)) : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default Home
