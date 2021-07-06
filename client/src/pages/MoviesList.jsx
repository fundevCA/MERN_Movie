import React, { Component, useState, useEffect, useMemo } from "react";
import api from "../api";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import styled from "styled-components";
import DeleteMovie from "../components/DeleteMovie";
import UpdateMovie from "../components/UpdateMovie";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;
const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);

      await api.getAllMovies().then(movies => {
        setMovies(movies.data.data);
        setLoading(false);
      });
    }

    fetchMovies();

    if (!movies.length) {
      setShow(false);
      return <></>;
    } else {
      setShow(true);
    }
  }, []);

  console.log(show);

  const columns = [
    {
      Header: "ID",
      accessor: "_id",
      filterable: true
    },
    {
      Header: "Name",
      accessor: "name",
      filterable: true
    },
    {
      Header: "Rating",
      accessor: "rating",
      filterable: true
    },
    {
      Header: "Time",
      accessor: "time",
      Cell: props => <span>{props.value.join(" / ")}</span>
    },
    {
      Header: "",
      accessor: "",
      Cell: function(props) {
        return (
          <span>
            <DeleteMovie id={props.original._id} />
          </span>
        );
      }
    },
    {
      Header: "",
      accessor: "",
      Cell: function(props) {
        return (
          <span>
            <UpdateMovie id={props.original._id} />
          </span>
        );
      }
    }
  ];

  return (
    <Wrapper>
      {show && (
        <ReactTable
          data={movies}
          columns={columns}
          loading={loading}
          defaultPageSize={10}
          showPageSizeOptions={true}
          minRows={0}
        />
      )}
    </Wrapper>
  );
};

export default MoviesList;
