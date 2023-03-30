// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import { Card, Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage, realTime_db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password); 
      
      try {
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email
        });
        await setDoc(doc(db, "userChats", res.user.uid), {});
        navigate("/");
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    } catch (err) {
      setErr(true)
    }

  }

  return (
    <Card className='cardContainer' style={{ width: '18rem' }}>
    <Card.Title>Atom Chat</Card.Title>
    <Card.Text>Register</Card.Text>
    <Card.Body>
    <Form className='formContainer' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerForm.ControlInput1">
        <Form.Label>Display Name</Form.Label>
        <Form.Control type="text" placeholder="Display Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.ControlInput2">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="registerForm.ControlPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='password' />
      </Form.Group>
      <Button className='justify-content-center' variant='primary' type="submit">Sign-up</Button>
      {err && <span>Something went wrong</span>}
    </Form>
    <Card.Text>Already have an Account? <Link to="/login">Login</Link></Card.Text>
    </Card.Body>
  </Card>
  )
}

export default Register
