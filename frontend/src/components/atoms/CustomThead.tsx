import React from "react";
import { Thead, Th, Tr } from "@chakra-ui/react";

type Props = {
  fields: string[];
};
const CustomThead: React.FC<Props> = ({ fields }) => {
  return (
    <Thead>
      <Tr>
        {fields.map((item) => (
          <Th key={item} id={item}>
            {item.charAt(0).toUpperCase() + item.slice(1).replace("_", " ")}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
};

export default CustomThead;
