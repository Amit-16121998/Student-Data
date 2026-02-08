import { Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

export default function EditStudent() {

    const navigate = useNavigate();
    const { studentid } = useParams();

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};

        if (!id.trim()) {
            newErrors.id = "ID is required";
        } else if (isNaN(id)) {
            newErrors.id = "ID must be a number";
        }

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.length < 3) {
            newErrors.name = "Name must be at least 3 characters";
        }

        if (!place.trim()) {
            newErrors.place = "Place is required";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = "Phone must be exactly 10 digits";
        }

        setErrors(newErrors);
        console.log(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Fetch student by ID and fill form
    useEffect(() => {
        fetch(`http://localhost:3000/students/${studentid}`)
            .then((res) => res.json())
            .then((data) => {
                setId(data.id);
                setName(data.name);
                setPlace(data.place);
                setPhone(data.phone);
            })
            .catch((err) => console.log(err));
    }, [studentid]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        const updatedStudent = { id, name, place, phone };

        fetch(`http://localhost:3000/students/${studentid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent)
        })
            .then(() => {
                alert("Student Updated Successfully");
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            <h1>Edit Student Details</h1>

            <div className="table-container">
                <form onSubmit={handleSubmit}>

                    <label>ID</label>
                    <input
                        type="text"
                        value={id}
                        className={errors.id ? "error-input" : ""}
                        onChange={(e) => { setId(e.target.value); setErrors({ ...errors, id: '' }) }}
                    />
                    {errors.id && <p className="error">{errors.id}</p>}

                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        className={errors.name ? "error-input" : ""}
                        onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: '' }) }}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <label>Place</label>
                    <input
                        type="text"
                        value={place}
                        className={errors.place ? "error-input" : ""}
                        onChange={(e) => { setPlace(e.target.value); setErrors({ ...errors, place: '' }) }}
                    />
                    {errors.place && <p className="error">{errors.place}</p>}

                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        className={errors.phone ? "error-input" : ""}
                        onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: '' }) }}
                    />
                    {errors.phone && <p className="error">{errors.phone}</p>}

                    <button className="btn btn-edit" type="submit">
                        Update
                    </button>

                    <Link to="/" className="btn btn-view">
                        Cancel
                    </Link>

                </form>
            </div>
        </div>
    );
}
