// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].value)
    // console.log(e.target[1].value)
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <Card className='cardContainer' style={{ width: '18rem' }}>
    <Card.Title>Atom Chat</Card.Title>
    <Card.Text>Login</Card.Text>
    <Card.Body>
    <Form className='formContainer' onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='password' />
      </Form.Group>
      <Button className='justify-content-center' variant='primary' type="submit">Login</Button>
      {err && <span>Something went wrong</span>}
    </Form>
    <Card.Text>Don't have an Account? <Link to="/register">Register</Link></Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Login
