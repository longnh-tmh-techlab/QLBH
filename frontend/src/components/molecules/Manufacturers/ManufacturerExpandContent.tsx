/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useToast,
} from "@chakra-ui/react";
import ManufacturerForm from "components/atoms/Manufacturers/ManufacturerForm";
import axios from "axios";
import { useHistory } from "react-router-dom";

type CategoriesList = {
  id: string;
  name: string;
  isChecked: boolean | false;
}[];

type Props = {
  manufacturer: any;
  isDisplay?: boolean;
};

const ManufacturerExpandContent: React.FC<Props> = ({
  manufacturer,
  isDisplay,
}) => {
  const [transactions, setTransactions] = useState<any[]>();
  const toast = useToast();
  useEffect(() => {
    const fetchTransactions = async () => {
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}receipts/findRecentByManufacturer/${manufacturer.id}`,
        { withCredentials: true }
      );
      if (transactions === undefined) {
        setTransactions(result.data);
      }
    };
    fetchTransactions();
  }, [isDisplay]);

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = `${process.env.REACT_APP_SERVER}manufacturers/delete/${manufacturer.id}`;
    const result = await axios.get(url, { withCredentials: true });
    if (result.data.status === "success") {
      sessionStorage.setItem("action", "delete");
      window.location.reload(false);
    } else {
      toast({
        title: `Delete Manufacturer fail`,

        status: "error",
        duration: 1500,
        isClosable: true,
      });
    }
  };
  if (isDisplay) {
    return (
      <Tabs>
        <TabList bgColor="#51cdc426">
          <Tab _selected={{ bgColor: "white", color: "black" }}>Info</Tab>
          <Tab _selected={{ bgColor: "white", color: "black" }}>
            Recent Receipt
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex w="100%">
              <Box w="31%" mr="2%">
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>Name:</Td>
                      <Td>{manufacturer.name}</Td>
                    </Tr>
                    <Tr>
                      <Td>Phone:</Td>
                      <Td>{manufacturer.phone}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
              <Box w="31%" mr="2%">
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>Email:</Td>
                      <Td>{manufacturer.email}</Td>
                    </Tr>
                    <Tr>
                      <Td>Address:</Td>
                      <Td>{manufacturer.address}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
              <Box w="33%">
                <Table>
                  <Tbody>
                    <Tr>
                      <Td>Total:</Td>
                      <Td>{manufacturer.total}</Td>
                    </Tr>
                    <Tr>
                      <Td>Note</Td>
                    </Tr>
                    <Box ml="1.5rem" minH="5rem">
                      {manufacturer.note}
                    </Box>
                  </Tbody>
                </Table>
              </Box>
            </Flex>
            <Flex justifyContent="flex-end" mt="1vh">
              <ManufacturerForm
                action="edit"
                selectedManufacturer={manufacturer}
              />
              <Button
                onClick={handleDelete}
                className="button"
                bgColor="#3399ff"
                color="white"
                m="0vh 1vw"
              >
                Delete
              </Button>
              {/* <Button onClick={handleDeleteManufacturer}>Delelte this Manufacturer</Button> */}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Box>
              <Box>
                <Table w="60%" m="auto" border="1px solid #dce6ef">
                  <Thead backgroundColor="#3399ff" border="1px solid #dce6ef">
                    <Th
                      textAlign="center"
                      color="white"
                      border="1px solid #dce6ef"
                    >
                      Id
                    </Th>
                    <Th
                      textAlign="center"
                      color="white"
                      border="1px solid #dce6ef"
                    >
                      Time
                    </Th>
                    <Th
                      textAlign="center"
                      color="white"
                      border="1px solid #dce6ef"
                    >
                      Staff
                    </Th>
                    <Th
                      textAlign="center"
                      color="white"
                      border="1px solid #dce6ef"
                    >
                      {" "}
                      Total
                    </Th>
                  </Thead>
                  <Tbody>
                    {transactions?.map((item) => (
                      <Tr border="1px solid #dce6ef">
                        <Td textAlign="center" border="1px solid #dce6ef">
                          {item.id}
                        </Td>
                        <Td textAlign="center" border="1px solid #dce6ef">
                          {item.created}
                        </Td>
                        <Td textAlign="center" border="1px solid #dce6ef">
                          {item.user.name}
                        </Td>
                        <Td textAlign="center" border="1px solid #dce6ef">
                          {item.total}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
  return <></>;
  // return (
  //   <Box>
  //     <Flex>
  //       <Box w="33.3%">
  //         <Image w="50%" src={image} alt="Error" />
  //       </Box>
  //       <Box>
  //         <Flex w="100%" bg="tomato">
  //           <Box>
  //             <Box>Id:</Box>
  //             <Box>Name:</Box>
  //             <Box>Original Price:</Box>
  //             <Box>Sell Price:</Box>
  //             <Box>Discount:</Box>
  //             <Box>Brand:</Box>
  //           </Box>
  //           <Box>
  //             <Box>{id}</Box>
  //             <Box>{name}</Box>
  //             <Box>{original_price}</Box>
  //             <Box>{sell_price}</Box>
  //             <Box>{discount}</Box>
  //             <Box>{manufacturer.name}</Box>
  //           </Box>
  //           <Box>
  //             <Box>Description</Box>
  //             <Box>{note}</Box>
  //             <Box>Categories</Box>
  //             {categories !== undefined ? (
  //               categories.map((category) => (
  //                 <Box key={category.name}>{category.name}</Box>
  //               ))
  //             ) : (
  //               <> </>
  //             )}
  //           </Box>
  //         </Flex>

  //         <Table>
  //           <Thead>
  //             <Td>Size</Td>
  //             <Td>Color</Td>
  //             <Td>Count</Td>
  //           </Thead>
  //           <Tbody>
  //             {inventory !== undefined ? (
  //               inventory.map((itemSize) => {
  //                 return itemSize.colors.map((itemColor) => {
  //                   return (
  //                     <Tr key={itemSize.size + itemColor.color}>
  //                       <td>{itemSize.size}</td>
  //                       <td>{itemColor.color}</td>
  //                       <td>{itemColor.count}</td>
  //                     </Tr>
  //                   );
  //                 });
  //               })
  //             ) : (
  //               <></>
  //             )}
  //           </Tbody>
  //         </Table>
  //       </Box>
  //     </Flex>
  //     <Flex>
  //       <ProductForm
  //         categoriesList={
  //           productExpandContentProps
  //             ? productExpandContentProps.categoriesList
  //             : undefined
  //         }
  //         manufacturersList={
  //           productExpandContentProps
  //             ? productExpandContentProps.manufacturersList
  //             : undefined
  //         }
  //         productStatesList={
  //           productExpandContentProps
  //             ? productExpandContentProps.productStatesList
  //             : undefined
  //         }
  //         action="edit"
  //         selectedProduct={product}
  //       />
  //       <Button onClick={handleDelete}>Delete</Button>
  //       <Button>Post FaceBook</Button>
  //       <Button>Stop Selling</Button>
  //     </Flex>
  //   </Box>

  // );
};
export default ManufacturerExpandContent;
