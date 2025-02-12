import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, editStudent } from "../redux/studentSlice";
import { useLocation } from "react-router-dom";


function StudentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const students = useSelector(state => state.student.students);
    const existingStudent = students.find(student => student.id === id);

    // useEffect(()=> {
    //    if(id){
    //     if(!existingStudent){
    //         navigate("/students");
    //     }
    //    }
    // },[location.pathname]);

    const initialValues = existingStudent || {
        id: Math.random().toString(36).substr(2, 9),
        student_name: '',
        email: '',
        date_of_birthdate: '',
        gender: '',
    };

    const validationSchema = Yup.object({
        student_name: Yup.string().required('Student name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        date_of_birthdate: Yup.date().required('Date of Birth is required'),
        gender: Yup.string().required('Gender is required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const isExistingStudent = students.some(student => student.email === values.email && student.id !== id);
            
            if(isExistingStudent){
                toast.error('The student already exists');
            }
            else if (id) {
                dispatch(editStudent(values));
                toast.success('Student updated successfully');
                setTimeout(() => {
                    navigate("/students");
                }, 3000);
            } else {
                dispatch(addStudent(values));
                toast.success('Student added successfully');
                setTimeout(() => {
                    navigate("/students");
                }, 3000);
            }
        },
    });

    return (
        <>
            <ToastContainer />
            <Container>
                <Row className="justify-content-center mt-5">
                    <Col md={6}>
                        <h2 className="text-center">{id ? "Edit Student" : "Add Student"}</h2>
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <Form.Group className='mt-2' controlId="formStudentname">
                                <p className='mb-1 text-start'>Student Name</p>
                                <Form.Control
                                    type="text"
                                    name="student_name"
                                    value={formik.values.student_name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.student_name && formik.errors.student_name}
                                    placeholder="Enter Student Name"
                                />
                                {formik.touched.student_name && formik.errors.student_name && (
                                    <div className="text-danger text-start">{formik.errors.student_name}</div>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formEmail">
                                <p className='mb-1 text-start mt-2'>Email</p>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    placeholder="Email"
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="text-danger text-start">{formik.errors.email}</div>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formDob">
                                <p className='mb-1 text-start'>Date of Birth</p>
                                <Form.Control
                                    type="date"
                                    name="date_of_birthdate"
                                    value={formik.values.date_of_birthdate}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={formik.touched.date_of_birthdate && formik.errors.date_of_birthdate}
                                />
                                {formik.touched.date_of_birthdate && formik.errors.date_of_birthdate && (
                                    <div className="text-danger text-start">{formik.errors.date_of_birthdate}</div>
                                )}
                            </Form.Group>

                            <Form.Group className='mt-2' controlId="formGender">
                                <p className='mb-1 text-start'>Gender</p>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        value="Male"
                                        checked={formik.values.gender === "Male"}
                                        onChange={formik.handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        value="Female"
                                        checked={formik.values.gender === "Female"}
                                        onChange={formik.handleChange}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Others"
                                        name="gender"
                                        value="Others"
                                        checked={formik.values.gender === "Others"}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                {formik.touched.gender && formik.errors.gender && (
                                    <div className="text-danger text-start">{formik.errors.gender}</div>
                                )}
                            </Form.Group>

                            <center>
                                <Button
                                    className='mt-3 px-5'
                                    variant="primary"
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                >
                                    {formik.isSubmitting ? 'Please Wait...' : 'Submit'}
                                </Button>

                                <Button
                                    className='mt-3 px-5 ms-2'
                                    variant="warning"
                                    onClick={() => navigate("/students")}
                                >
                                    Cancel
                                </Button>
                            </center>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StudentForm;
