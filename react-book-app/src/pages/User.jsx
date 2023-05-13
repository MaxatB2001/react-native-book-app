import { Center, TabList,Button, Tabs, Tab, TabPanels, TabPanel, Text, useColorModeValue, Box, Image, InputGroup, Input, Textarea, Stack, Card, CardBody } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import "../App.css"

const User = () => {
    const colors = useColorModeValue(
        ['red.50', 'teal.50', 'blue.50', 'yellow.50'],
        ['red.900', 'teal.900', 'blue.900', 'yellow.900'],
      )
      const [tabIndex, setTabIndex] = useState(0)
      const bg = colors[tabIndex]
      const [news, setNews] = useState({
        title: "",
        text: "",
        picture: null,
      })
      const [allNews, setAllNews] = useState([])

      const [book, setBook] = useState({
        name: "",
        author: "",
        genre: "",
        pages: "",
        bookFile: null,
        picture: null
      })

      useEffect(() => {
        fetch("http://62.217.176.76/api/user/feedback").then(data => data.json()).then(data => setFeedbacks(data))
        fetch("http://62.217.176.76/api/news/allNews").then(data => data.json()).then(data => {
            setAllNews(data)
            console.log(data);
        })
      }, [])

      const [feedbacks, setFeedbacks] = useState([])
      const [comments, setComments] = useState([])

      const createNews = async () => {
        const formData = new FormData()
        formData.append("title", news.title)
        formData.append("text", news.text)
        formData.append("picture", news.picture)

        const res = await fetch("http://62.217.176.76/api/news", {
            method: "POST",
            body: formData,
        }) 
        const data = await res.json();
        console.log(data);
      }

    //   const getFeedBack = async () => {
    //     const feedback = await fetch("https://584b-176-52-98-169.ngrok-free.app/api/user/feedback" ,{
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //           },
              
    //     })
    //     const data =  await feedback.json()
    //     return data
    //   }

      const createBook = async () => {
        const formData = new FormData()
        formData.append("name", book.name)
        formData.append("pages", Number(book.pages))
        formData.append("author", book.author)
        formData.append("genre", book.genre)
        formData.append("picture", book.picture)
        formData.append("bookFile", book.bookFile)
        const res = await fetch("http://62.217.176.76/api/book", {
            method: "POST",
            body: formData,
        }) 
        const data = await res.json();
        console.log(data);
    }

    return (
    
                <Tabs height={"100vh"} onChange={(index) => setTabIndex(index)} bg={bg}>
                <TabList>
                    <Tab>Доабвить Новость</Tab>
                    <Tab>Доабвить Книгу</Tab>
                    <Tab>Обсуждения</Tab>
                    <Tab>Обратная связь</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Center>
                            <Card width={"50%"}>
                                <CardBody>
                                <Stack>
                                <Input value={news.title} onChange={(e) => setNews({...news, title: e.target.value})} placeholder="Заголовок"/>
                                <Textarea value={news.text} onChange={(e) => setNews({...news, text: e.target.value})} placeholder="Текст"/>
                                <label className="input-file">
                                    <input onChange={e => setNews({...news, picture: e.target.files[0]})} name="picture" type="file"/>
                                    <span className="input-file-btn">Загрузить изображение</span>           
                                </label>
                                <Button onClick={createNews} colorScheme='green'>Добавить</Button>
                                </Stack>
                                </CardBody>
                            </Card>
                        </Center>
                    </TabPanel>
                    <TabPanel>
                    <Center>
                            <Card width={"50%"}>
                                <CardBody>
                                <Stack>
                                <Input value={book.name} onChange={(e) => setBook({...book, name: e.target.value})} placeholder="Название книги"/>
                                <Input value={book.author} onChange={(e) => setBook({...book, author: e.target.value})} placeholder="Автор"/>
                                <Input value={book.genre} onChange={(e) => setBook({...book, genre: e.target.value})} placeholder="Жанр"/>
                                <Input value={book.pages} onChange={(e) => setBook({...book, pages: e.target.value})}  placeholder="Количество страниц"/>
                                <Textarea placeholder="Описание"/>
                                <label className="input-file">
                                    <input onChange={e => setBook({...book, picture: e.target.files[0]})} name="picture" type="file"/>
                                    <span className="input-file-btn">Загрузить изображение</span>           
                                </label>
                                <label className="input-file">
                                    <input onChange={e => setBook({...book, bookFile: e.target.files[0]})} name="picture" type="file"/>
                                    <span className="input-file-btn">Загрузить книгу</span>           
                                </label>
                                <Button onClick={createBook} colorScheme='green'>Добавить</Button>
                                </Stack>
                                </CardBody>
                            </Card>
                        </Center>
                    </TabPanel>
                    <TabPanel bg={bg}>
                        <Stack spacing={2}>
                            {allNews.map(item => 
                                <Center key={item._id} >
                                    <Card w={"50%"}>
                                    <CardBody>
                                        <Text fontWeight={"bold"}>{item.title}</Text>
                                        <Text>{item.text}</Text>
                                        <Image src={`http://62.217.176.76/${item.picture}`}/>
                                        {item.newsComments.map(item =>
                                            <Card key={item._id} marginTop={"10px"} padding={"10px"}>
                                                <Text fontWeight={"bold"}>
                                                    {item.user.email}
                                                </Text>
                                                <Text>
                                                {item.text}
                                                </Text>
                                            </Card>    
                                        )}
                                    </CardBody>
                                </Card>    
                                </Center>
                            )}
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack spacing={2}>
                        {feedbacks.map(item => 
                            <Card key={item._id} padding={"10px"}>
                                <Text>{item.text}</Text>
                            </Card>    
                        )}
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        

    )
}

export default User