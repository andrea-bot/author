import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams, Link } from 'react-router-dom';


const EditAuthors = (props) => {
    const [auth, setAuth] = useState(null);
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors/" + id)
            .then((res) => {
                setAuth(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleOnchange = (e) => {
        const updatedKey = e.target.name;
        const newValue = e.target.value;
        setAuth({ ...auth, [updatedKey]: newValue });
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/authors/${auth._id}`, auth)
            .then((res) => {
                console.log(res.data);
                history.push(``);
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
                console.log(err);
            });
    };
    if (auth === null) {
        return "Loading...";
    }


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Favorite authors</h1>

            <Link to="/">
                Home
            </Link>
            <h3>Edit this author</h3>
            <div>
                <form
                    //below are code if Submit set to button in JSX page. Line 80
                    // onSubmit={(e) => {
                    //     handleEditSubmit(e)
                    // }}
                    style={{ justifyContent: "center" }}

                >
                    <label> Name: </label>
                    {errors?.name && (<span style={{ color: "red" }}>{errors?.name?.message}</span>)}

                    <input onChange={(e) => {
                        handleOnchange(e);
                    }}
                        type="text"
                        value={auth.name}
                        name="name"
                    />
                    <br />
                    <Link onClick={(e) => {
                        handleEditSubmit(e)
                    }}>
                        Submit
                    </Link>
                    {/* make sure put the button inside the form to make it work*/}
                    {/* <button>
                        Submit
                    </button> */}
                    <Link to="/">
                        Cancel
                    </Link>
                </form>
            </div>

        </div >

    );
};
export default EditAuthors;