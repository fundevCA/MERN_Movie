import React from "react";
import api from "../api";
import styled from "styled-components";

const update = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

const UpdateMovie = id => {
  const UpdateUser = event => {
    event.preventDefault();
    window.location.href = `/movies/update/${id}`;
  };

  return <update onClick={UpdateUser}>update</update>;
};
export default UpdateMovie;
