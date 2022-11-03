import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import AppNavbar from "../components/AppNavbar";
import axios from "axios";

import { getHeaders } from "../utils/requestUtils";

const Profile = () => {
    const navigator = useNavigate();
    const [profileData, setProfileData] = useState("");

    useEffect(() => {
        getProfileData()
    }, [])

    const getProfileData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: 'https://port-server.herokuapp.com/api/user/getProfileData',
                headers: getHeaders()
            })
            if (response.status === 200) {
                setProfileData(response.data)
            }
        } catch (error) {
            Cookies.remove('name')
            Cookies.remove('token')
            navigator('/')
        }
    }

    return (
        <div style={{ width: '500px' }}>
            <AppNavbar />
            <div style={{ backgroundColor: '#8475e3', padding: '25%', height: '750px' }}>
                <Card style={{ width: '18rem', backgroundColor: "white", color: 'black' }}>
                    <Card.Img variant="top" src="https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png" />
                    <Card.Body>
                        <Card.Title>{profileData.name}</Card.Title>
                        <Card.Text>
                            Wysa Beginner
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Profile
