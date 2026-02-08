import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

export default function ViewDetails() {

    const { studentid } = useParams();
    console.log(studentid);
    const [student, setStudent] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/students/${studentid}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }, [studentid])

    if (!student) {
        return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
    }

    return (
        <div className="container">
            <h1>Student Details</h1>
            {student && <div className="details-card">
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Place:</strong> {student.place}</p>
                <p><strong>Phone:</strong> {student.phone}</p>
                <Link to="/" className="btn btn-edit">Back to Student List</Link>
            </div>
            }

        </div>
    )
}