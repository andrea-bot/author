import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const NewAuthor = (props) => {
    const [name, setName] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState(null);

    const handleNewSubmit = (e) => {
        e.preventDefault();
        const newName = { name };

        axios.post(`http://localhost:8000/api/authors`, newName)
            .then((res) => {
                console.log(res.data);
                history.push(``)
            })
            .catch((err) => {
                setErrors(err.response.data.errors)
            });
    };


    return (
        <div>
            <h1>Favorite authors</h1>
            <Link to="/">
                Home
            </Link>
            <h3>Add a new author</h3>
            <form onSubmit={(e) => {
                handleNewSubmit(e);
            }}>
                <div>
                    <label> Name: </label>
                    <br />
                    {errors?.name && (<span style={{ color: 'red' }}>{errors?.name?.message}</span>)}
                    <input onChange={(e) => {
                        setName(e.target.value)
                    }} type="text" />
                </div>
                <Link to="/">
                    Cancel
                </Link>
                {/* do use Link along with onsubmit function on the form tag, it will breaks the code
                button with onSubmit function in the form tags */}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
};

export default NewAuthor;