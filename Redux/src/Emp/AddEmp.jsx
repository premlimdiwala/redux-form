import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmp } from '../redux/actions';
import { Form, Button, Container, Card, Row, Col } from 'react-bootstrap';
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function AddEmp() {
    const [employee, setEmployee] = useState({});
    const [hobby, setHobby] = useState([]);
    const empData = useSelector((state) => state.empData.employee);
    const dispatch = useDispatch();

    const getInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let prevHobby = [...hobby];

        if (name === 'hobby') {
            if (e.target.checked) {
                prevHobby.push(value);
            } else {
                prevHobby = prevHobby.filter((v) => v !== value);
            }
            setHobby(prevHobby);
            setEmployee({ ...employee, hobby: prevHobby });
        } else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const submitData = (e) => {
        e.preventDefault();
        let newID = empData.length > 0 ? Math.max(...empData.map(emp => emp.empid)) + 1 : 1;
        if (!employee.name || !employee.email) {
            alert("Please fill all the fields");
            return;
        }
        let emp = { ...employee, empid: newID };
        dispatch(addEmp(emp));
        setEmployee({});
        setHobby([]);
    };

    return (
        <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <Card className="p-5 shadow-lg border-0 rounded-4 bg-white text-dark animate__animated animate__fadeIn" style={{ width: '100%', maxWidth: '600px' }}>
                <h2 className="text-center mb-5 fw-bold" style={{ color: '#007bff' }}>Add Employee</h2>

                <Form onSubmit={submitData}>
                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={employee.name || ''}
                            onChange={getInput}
                            placeholder="Enter your name"
                            className="bg-light text-dark border-secondary rounded-3 focus-ring"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={employee.email || ''}
                            onChange={getInput}
                            placeholder="Enter your email"
                            className="bg-light text-dark border-secondary rounded-3 focus-ring"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={employee.age || ''}
                            onChange={getInput}
                            placeholder="Enter your age"
                            className="bg-light text-dark border-secondary rounded-3 focus-ring"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={employee.password || ''}
                            onChange={getInput}
                            placeholder="Enter your password"
                            className="bg-light text-dark border-secondary rounded-3 focus-ring"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Gender</Form.Label>
                        <Row className="ms-1">
                            <Col xs="auto">
                                <Form.Check
                                    type="radio"
                                    label="Male"
                                    name="gender"
                                    value="Male"
                                    checked={employee.gender === "Male"}
                                    onChange={getInput}
                                    className="text-dark"
                                />
                            </Col>
                            <Col xs="auto">
                                <Form.Check
                                    type="radio"
                                    label="Female"
                                    name="gender"
                                    value="Female"
                                    checked={employee.gender === "Female"}
                                    onChange={getInput}
                                    className="text-dark"
                                />
                            </Col>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Hobbies</Form.Label>
                        <div className="d-flex flex-wrap gap-3 ms-1">
                            {["Cricket", "Football", "Music", "Reading"].map((h, i) => (
                                <Form.Check
                                    key={i}
                                    type="checkbox"
                                    label={h}
                                    name="hobby"
                                    value={h}
                                    checked={hobby.includes(h)}
                                    onChange={getInput}
                                    className="text-dark"
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-100 rounded-3 fw-bold shadow-sm"
                        style={{ padding: '12px 0', fontSize: '1.1rem', borderWidth: '2px' }}
                    >
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
}

export default AddEmp;
