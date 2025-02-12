import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStudent } from '../redux/studentSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';



function Students() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const students = useSelector((state) => state.student.students);
    const handleEdit = (id) => {
        navigate(`/students/edit/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            dispatch(deleteStudent(id));
            toast.success('Student Deleted successfully');
        }
    };

    return (
        <>
            <ToastContainer />
            <Container>
                {students?.length > 0 ? (
                    <div className="">
                        <div className="d-flex justify-content-end">
                            <Button
                                className='mt-3 px-5 mb-3'
                                variant="primary"
                                type="submit"
                                onClick={() => navigate("/students/add")}
                            >
                                {'Add Student'}
                            </Button>
                        </div>
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Student Name</th>
                                        <th>Email</th>
                                        <th>DOB</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students?.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.student_name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.date_of_birthdate}</td>
                                            <td>{student.gender}</td>
                                            <td>
                                                <Button variant="warning" size="sm" onClick={() => handleEdit(student.id)}><i className="bi bi-pencil-fill"></i></Button>{' '}
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}><i className="bi bi-trash-fill"></i></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                ) :
                    <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                        <h1>
                            No Student Data Found.
                        </h1>

                        <Button
                            className='mt-3 px-5'
                            variant="primary"
                            type="submit"
                            onClick={() => navigate("/students/add")}
                        >
                            {'Add Student'}
                        </Button>
                    </div>
                }
            </Container>
        </>
    );
}

export default Students;