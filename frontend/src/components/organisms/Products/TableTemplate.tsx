import React from "react";
import { css, SerializedStyles } from "@emotion/react";
import { Table, Tbody, Tr, Td } from "@chakra-ui/react";
import CustomThead from "components/atoms/CustomThead";
import ProductExpandContent from "components/molecules/Products/ProductExpandContent";

const tableStyle = css`
  border: groove;
`;
type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];
type ManufacturersList = {
  id: number;
  name: string;
}[];
type Props = {
  fields: string[];

  dataList: any;
  itemType: string;
  expandList: { id: number; display: boolean }[];
  handleClick: (e: React.MouseEvent<HTMLTableRowElement>) => void;

  categoriesList: CategoriesList;
  manufacturersList: ManufacturersList;
};

const TableTemplate: React.FC<Props> = ({
  fields,

  dataList,
  itemType,
  expandList,
  handleClick,
  categoriesList,
  manufacturersList,
}) => {
  return (
    <Table>
      <CustomThead fields={fields} />

      <Tbody>
        {dataList.map((item: any) => {
          const displayItem = expandList.filter(
            (expandItem) => expandItem.id === Number(item.id)
          )[0];

          return (
            <React.Fragment key={item.id}>
              <Tr id={item.id} onClick={handleClick}>
                {fields.map((field) => (
                  <Td key={field}>{item[field]}</Td>
                ))}
              </Tr>

              <Tr
                id={`${item.id}-content`}
                style={{
                  display:
                    displayItem !== undefined && displayItem.display === true
                      ? "table-row"
                      : "none",
                }}
              >
                <Td colSpan={fields.length}>
                  {itemType === "product" ? (
                    <ProductExpandContent
                      product={item}
                      categoriesList={categoriesList}
                      manufacturersList={manufacturersList}
                    />
                  ) : (
                    1
                  )}
                </Td>
              </Tr>
            </React.Fragment>
          );
        })}
      </Tbody>
    </Table>
  );
};
export default TableTemplate;
