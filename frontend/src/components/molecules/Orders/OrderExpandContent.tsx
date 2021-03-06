/* eslint-disable camelcase */
import React from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";

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
  order: {
    id: number;
    pay: number;

    note: string;
    created: string;
    modified: string;
    order_details: {
      id: number;
      order_id: number;
      count: number;
      created: string;
      modified: string;
      color: {
        id: number;
        name: string;
      };
      size: {
        id: number;
        name: string;
      };
      product: {
        id: number;
        name: string;
        manufacturer_id: number;
        state_id: number;
        note: string;
        original_price: number;
        sell_price: number;
        image: string;
        discount: number;
        created: string;
        modified: string;
      };
    }[];
    transaction_state: {
      id: number;
      name: string;
    };
    staff: { id: number; name: string } | null;
    customer: {
      id: number;
      name: string;
    };
    state: {
      id: number;
      name: string;
    };
  };
  // receiptExpandContentProps:
  //   | {
  //       handleDeleteReceipt: (e: React.MouseEvent<HTMLButtonElement>) => void;
  //     }
  //   | undefined;
};

const OrderExpandContent: React.FC<Props> = ({
  order,
  // receiptExpandContentProps,
}) => {
  const position = Cookies.get("position");
  const deleteOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    const result = await axios.get(
      `${process.env.REACT_APP_SERVER}orders/delete/${id}`,
      { withCredentials: true }
    );
    window.location.reload(false);
  };
  return (
    <Box>
      <Table>
        <Thead>
          <Td>Product Id</Td>
          <Td>Product</Td>
          <Td>Size</Td>
          <Td>Color</Td>
          <Td>Count</Td>
          <Td>Price</Td>
          <Td>Discount</Td>
          <Td>Amount</Td>
        </Thead>
        <Tbody>
          {order.order_details.map((detail) => (
            <Tr key={detail.id}>
              <Td>{detail.product.id}</Td>
              <Td>{detail.product.name}</Td>
              <Td>{detail.size.name}</Td>
              <Td>{detail.color.name}</Td>
              <Td>{detail.count}</Td>
              <Td>{detail.product.sell_price}</Td>
              <Td>{detail.product.discount}</Td>
              <Td>
                {(detail.product.sell_price *
                  detail.count *
                  (100 - detail.product.discount)) /
                  100}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(() => {
        if (position !== undefined) {
          if (parseInt(position, 10) === 3) {
            if (order.transaction_state.id === 1) {
              return (
                <Button id={order.id.toString()} onClick={deleteOrder}>
                  Delete Order
                </Button>
              );
            }
            return <></>;
          }
          return (
            <>
              {" "}
              <Link to={`/orders/update/${order.id}`}>
                <Button>Update</Button>{" "}
              </Link>
              <Button id={order.id.toString()} onClick={deleteOrder}>
                Delete Order
              </Button>
            </>
          );
        }
        return <></>;
      })()}

      {/* <Box>{receipt.total}</Box>

      <Flex>
        <Button
          id={receipt.id}
          onClick={
            receiptExpandContentProps
              ? receiptExpandContentProps.handleDeleteReceipt
              : undefined
          }
        >
          Return Products
        </Button>
        <Button>
          <Link to={`/receipts/update/${receipt.id}`}>Update Products</Link>
        </Button>
      </Flex> */}
    </Box>
  );
};
export default OrderExpandContent;
