import React, { useState, useEffect, useCallback, memo } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control"
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

const MoviesInsert = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [time, setTime] = useState("");

  const handleChangeInputName = useCallback(async event => {
    const name = event.target.value;
    setName(name);
  }, []);

  const handleChangeInputRating = useCallback(async event => {
    const rating = event.target.validity.valid ? event.target.value : rating;

    setRating(rating);
  }, []);

  const handleChangeInputTime = useCallback(async event => {
    const time = event.target.value;
    setTime(time);
  }, []);

  const handleIncludeMovie = useCallback(async () => {
    const arrayTime = time.split("/");
    const payload = { name, rating, time: arrayTime };

    await api.insertMovie(payload).then(res => {
      window.alert(`Movie inserted successfully`);
      setName("");
      setRating("");
      setTime("");
    });
  }, [name, rating, time]);

  return (
    <Wrapper>
      <Title>Create Movie</Title>

      <Label>Name: </Label>
      <InputText type="text" value={name} onChange={handleChangeInputName} />

      <Label>Rating: </Label>
      <InputText
        type="number"
        step="0.1"
        lang="en-US"
        min="0"
        max="10"
        pattern="[0-9]+([,\.][0-9]+)?"
        value={rating}
        onChange={handleChangeInputRating}
      />

      <Label>Time: </Label>
      <InputText type="text" value={time} onChange={handleChangeInputTime} />

      <Button onClick={handleIncludeMovie}>Add Movie</Button>
      <CancelButton href={"/movies/list"}>Cancel</CancelButton>
    </Wrapper>
  );
};

export default memo(MoviesInsert);
