import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import muiTheme from "../../muiTheme";
import { getRandomQuote } from "../../actions/quote";
import { useValue } from "../../context/ContextProvider";

const Quote = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useValue();
  const [quote, setQuote] = useState({
    content: "Never leave till tomorrow that which you can do today",
    author: "Golda Meir",
  });
  useEffect(() => {
    try {
      const getQuote = async () => {
        const quote = await getRandomQuote(currentUser.token, {}, dispatch);
        console.log(quote);
        setQuote({ content: quote.content, author: quote.author });
      };
      getQuote();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <Typography
        textAlign={"center"}
        fontStyle="italic"
        paddingBottom={1}
        fontFamily="Prompt"
        fontSize="1.5rem"
        color={muiTheme.palette.primary.dark}
      >
        {quote.content}
      </Typography>
      <Typography
        fontStyle="italic"
        textAlign={"right"}
        paddingTop={1}
        fontFamily="Prompt"
      >
        -- {quote.author}
      </Typography>
    </>
  );
};

export default Quote;
