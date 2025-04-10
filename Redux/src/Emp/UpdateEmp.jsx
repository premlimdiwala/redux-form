import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../redux/actions';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function UpdateEmp() {
    const [employee, setEmployee] = useState({});
    const empData = useSelector((state) => state.empData.employee);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const oldEmp = empData.find(emp => emp.empid === Number(id));
        if (oldEmp) {
            setEmployee({
                ...oldEmp,
                hobby: Array.isArray(oldEmp.hobby) ? oldEmp.hobby : [],  
                gender: oldEmp.gender || "",  
            })
        }
    }, [id, empData]);

    console.log(employee)

    const getInput = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox' ) {
            const hobbies = employee.hobby || [];
            if (checked) {
                setEmployee({ ...employee, hobby: [...hobbies, value] });
            } else {
                setEmployee({ ...employee, hobby: hobbies.filter(h => h !== value) });
            }
            setEmployee({ ...employee, hobby: hobbies });
        } else if (type=== 'radio') {
            setEmployee({ ...employee, [name]: value }); 
        }
        else {
            setEmployee({ ...employee, [name]: value });
        }
    };

    const submitData = (e) => {
        e.preventDefault();
        if (!employee.name || !employee.email) {
            alert("Fill all the fields");
            return;
        }
        dispatch(updateEmployee(employee));
        navigate("/viewemp");
    };

    return (
        <div className="bg-dark min-vh-100 py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="p-4 shadow-lg" bg="dark" text="light">
                            <Card.Body>
                                <h2 className="text-center mb-4">Edit Employee</h2>
                                <Form onSubmit={submitData}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={employee.name || ""}
                                            onChange={getInput}
                                            placeholder="Enter name"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={employee.email || ""}
                                            onChange={getInput}
                                            placeholder="Enter email"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="age"
                                            value={employee.age || ""}
                                            onChange={getInput}
                                            placeholder="Enter age"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={employee.password || ""}
                                            onChange={getInput}
                                            placeholder="Enter password"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Gender</Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Male"
                                                name="gender"
                                                value="male"
                                                checked={employee.gender == 'Male' ? "checked" : ""}
                                                onChange={getInput}

                                            />
                                            <Form.Check
                                                inline
                                                type="radio"
                                                label="Female"
                                                name="gender"
                                                value="female"
                                                checked={employee.gender == 'Female' ? "checked" : ""}
                                                onChange={getInput}
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Hobbies</Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                label="Cricket"
                                                name="hobby"
                                                value="Cricket"
                                                checked={employee.hobby?.includes('Cricket')}
                                                onChange={getInput}
                                            />
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                label="Football"
                                                name="hobby"
                                                value="Football"
                                                checked={employee.hobby?.includes('Football')}
                                                onChange={getInput}
                                            />
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                label="Music"
                                                name="hobby"
                                                value="Music"
                                                checked={employee.hobby?.includes('Music')}
                                                onChange={getInput}
                                            />
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                label="Reading"
                                                name="hobby"
                                                value="Reading"
                                                checked={employee.hobby?.includes('Reading')}
                                                onChange={getInput}
                                            />
                                        </div>
                                    </Form.Group>

                                    <div className="text-center">
                                        <Button variant="primary" type="submit" className="px-5">
                                            Update
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UpdateEmp;
