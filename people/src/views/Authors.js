import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Authors = (props) => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors")
            .then((res) => {
                setAuthors(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const handleDelete = (delId) => {
        axios
            .delete("http://localhost:8000/api/authors/" + delId)
            .then((res) => {
                // It has successfully been deleted from the DATABASE
                // It is still IN our state, we need to remove it from state.
                const filteredAuthors = authors.filter((auth) => {
                    return auth._id !== delId;
                });

                setAuthors(filteredAuthors);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    return (
        <div>
            <h1>Favorite authors</h1>
            <br />
            <Link to="/new">
                Add an author
            </Link>
            <p>We have quotes by: </p>
            <br />

            <div>
                <table style={{ color: "purple", marginLeft: "630px", display: "center", boxShadow: "initial", padding: "30px", boxborder: "solid, black" }}>
                    <thead style={{ backgroundColor: "yellow" }}>
                        <tr>
                            <th>Author</th>
                            <th>Actions availible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* .map is a for loop to render all bunch of thing in JSX */}
                        {authors.map((auth) => {
                            return (
                                <tr key={auth._id}>
                                    <td>{auth.name}</td>
                                    <td>
                                        <nav>
                                            <Link
                                                to={`/authors/${auth._id}`}
                                                className="btn btn-sm btn-outline-warning mx-1"
                                            >
                                                Edit
                                            </Link>
                                            {" "} | {" "}
                                            <button
                                                onClick={(e) => {
                                                    handleDelete(auth._id);
                                                }}
                                                className="btn btn-sm btn-outline-danger mx-1"
                                            >
                                                Delete
                                            </button>
                                        </nav>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody >
                </table >
            </div>
        </div >
    )
};


export default Authors;