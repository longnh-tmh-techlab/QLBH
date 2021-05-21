/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { css, SerializedStyles } from "@emotion/react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Select,
  Flex,
  Box,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Props = {
  searchResult: {
    id: string;
    name: string;

    image: string;
  }[];
};
const SearchResultTemplate: React.FC<Props> = ({ searchResult }) => {
  return (
    <Box
      position="absolute"
      top="100%"
      zIndex="1"
      bgColor="white"
      border="1px solid gray"
    >
      {searchResult.map((item) => {
        return (
          <Link to={`/store/product/${item.id}`}>
            <Flex key={item.id} id={item.id}>
              <Box w="33.3%">
                <Image
                  w="50%"
                  src={`http://localhost:8765/img/${item.image}`}
                  alt="Error"
                />
              </Box>
              <Box>
                <Box>{item.name}</Box>
              </Box>
            </Flex>
          </Link>
        );
      })}
    </Box>
  );
};
export default SearchResultTemplate;