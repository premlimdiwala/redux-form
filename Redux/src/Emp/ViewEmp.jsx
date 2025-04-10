import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../redux/actions';
import { Link } from 'react-router-dom';
import { Table, Container, Button } from 'react-bootstrap';

function ViewEmp() {
  let emp = useSelector((state) => state.empData.employee);
  let dispatch = useDispatch();

  let deleteEmp = (e, id) => {
    e.preventDefault();
    dispatch(deleteEmployee(id));
  };

  return (
    <div className="bg-light min-vh-100 py-5"> {/* Light background */}
      <Container className="text-dark">
        <h1 className="text-center mb-4" style={{ color: '#007bff' }}>Employee Data</h1>
        
        {/* Table Container */}
        <div className="bg-white p-4 rounded shadow-sm">
          <Table bordered hover responsive className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Password</th>
                <th>Gender</th>
                <th>Hobby</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emp.length > 0 ? (
                emp.map((v) => (
                  <tr key={v.empid}>
                    <td>{v.empid}</td>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.age}</td>
                    <td>{v.password}</td>
                    <td>{v.gender}</td>
                    <td>{v.hobby.join(", ")}</td>
                    <td className="d-flex gap-2">
                      <Link to={`/updateEmp/${v.empid}`}>
                        <Button variant="info" size="sm" className="rounded-3">Edit</Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => deleteEmp(e, v.empid)}
                        className="rounded-3"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default ViewEmp;
