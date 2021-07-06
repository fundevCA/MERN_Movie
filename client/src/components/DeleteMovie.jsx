import React from "react";
import api from "../api";
import styled from "styled-components";

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

const DeleteMovie = ({ id }) => {
  console.log(id);
  const deleteUser = event => {
    event.preventDefault();

    if (window.confirm(`Do tou want to delete the movie ${id} permanently?`)) {
      api.deleteMovieById(id);
      window.location.reload();
    }
  };

  return <Delete onClick={deleteUser}>Delete</Delete>;
};
export default DeleteMovie;
