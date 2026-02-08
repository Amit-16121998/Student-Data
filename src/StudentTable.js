import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function StudentTable() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/students")
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) {
            return;
        }

        fetch(`http://localhost:3000/students/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                setStudents(students.filter(student => student.id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            <h1>Student Records</h1>
            <div className="table-container">
                <Link to="/student/create">Add New Student</Link>

                <table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, index) => (
                                <tr key={student.id}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.place}</td>
                                    <td>{student.phone}</td>
                                    <td>
                                        <Link to={`/student/view/${student.id}`} className="btn btn-view">View</Link>
                                        <Link to={`/student/edit/${student.id}`} className="btn btn-edit">Edit</Link>

                                        <button
                                            className="btn btn-delete"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
