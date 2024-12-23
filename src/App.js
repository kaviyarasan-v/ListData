import { Button, Col, Input, Modal, notification, Row } from "antd";
import React, {useState, useEffect} from "react";
import './App.css';

const App = () => {
    const [listData, setListData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [body, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [updateData, setUpdateData] = useState({});


    const fetchData = async () => {
        try {
            const API = 'https://jsonplaceholder.typicode.com/posts';
            const responce = await fetch(API);
            const data = await responce.json();
            setListData(data);
            console.log('data---->', data);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchData();
    },[]);

    const handleSubmit = () => {
        const details = listData;
        if(slug === 'add') {
        const newData = [...details, {'userId': '', 'id': details.length + 1, title, body }];
        setListData(newData);
        // notification('success', 'Successfully Added');
        } else {
            const findIndex = details.findIndex(item => item.id === updateData.id);
            details[findIndex].title = title;
            details[findIndex].body = body;
            setListData(details);
            // notification('success', 'Successfully Updated');
        }
        setVisible(false);
        setSlug('');
        setUpdateData({});
        setBody('');
        setTitle('');
    };

    const handleUpdate = (item) => {
        setSlug('edit');
        setVisible(true);
        setUpdateData(item);
        setBody(item.body);
        setTitle(item.title);
        // const filterdData = listData.filter(item => item.id === id);
        // console.log('filterdData----->', filterdData);
    }
    const handleDelete = (item) => {
        const deletedData = listData.filter(list => list.id !== item.id);
        setListData(deletedData);

        // console.log('filterdData----->', filterdData);
    }

  return (
    <div className="list-container">
        <Row justify='end' style={{paddingBottom: '10px'}}>
            <Col>
            <Button onClick={()=> {setVisible(true); setSlug('add')}} className="add-btn btn">
                ADD
            </Button>
            </Col>
        </Row>
    <table>
        <thead className="table-header">
            <tr>
                <th>Title</th>
                <th>Body</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {listData?.sort((a,b)=> b.id - a.id).map((item) => (
            <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                <Row justify='space-between'>
                    <Col>
                        <Button onClick={() => handleUpdate(item)} className="edit-btn btn">
                            Edit
                        </Button>
                        <Button onClick={() => handleDelete(item)} className="del-btn btn">
                            Delete
                        </Button>
                    </Col>
                </Row>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    <Modal 
    open={visible}
    onOk={()=> handleSubmit()}
    onCancel={()=> setVisible(false)}
    onClose={()=> setVisible(false)}
    title='Add Data'
    >
        <Row gutter={12}>
            <Col span={12}>
                <label>Title</label>
                <Input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}></Input>
            </Col>
            <Col span={12}>
                <label>Body</label>
                <Input type="text" value={body} onChange={(e)=> setBody(e.target.value)}></Input>
            </Col>
        </Row>
    </Modal>
    </div>
  );
};

export default App;
