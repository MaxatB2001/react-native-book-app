import { Card, CardBody, Center, Input, Button, Box, Image} from "@chakra-ui/react"
import logo from  "../assets/knitu.png" 
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const handle = async () => {
        const res = await fetch("http://62.217.176.76/api/user/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(data)
        })
        if (res.status === 200) {
            console.log(typeof res.status);
            navigate("/user")
        } else {
            console.log(res.status);
        }
    }

    return (
        <Center background={"#5B1E31"} h="calc(100vh)">
            <Card background="#6e2d4c">
                <CardBody >
                    <Center>
                    <Box marginBottom={"15px"}   boxSize={"150px"}>
                        <Image src={logo}/>
                    </Box>
                    </Center>
                    <Input color={"white"} value={data.email} onChange={(event) => {setData({...data, email: event.target.value})}} background="#270A1F" marginBottom={"10px"} placeholder="Логин"/>
                    <Input color={"white"} value={data.password} onChange={(event) => { setData({...data, password: event.target.value})}} background="#270A1F" marginBottom={"10px"} placeholder="Пароль" type="password"/>
                    <Button colorScheme='gray' onClick={handle}>Войти</Button>
                </CardBody>
            </Card>
        </Center>
    )
}

export default Login