/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import {
  Icon,
  Button,
  Box,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  Stack,
  useDisclosure,
  Text,
  useToast,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios from "axios";
import UserForm from "components/atoms/Users/UserForm";
import CustomMenu from "components/atoms/CustomMenu";
import SearchModal from "components/molecules/Customer/SearchModal";

type searchResultType = {
  id: string;
  name: string;
  image: string;
}[];
const MenuBarContainer: React.FC = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<searchResultType>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const email = Cookies.get("email");
  const position = Cookies.get("position");
  const [customer, setCustomer] = useState();
  const action = sessionStorage.getItem("action");
  const toast = useToast();
  const fetchUserData = async (customerEmail: string) => {
    const url = `${process.env.REACT_APP_SERVER}users/getUserByEmail/${customerEmail}`;
    const result = await axios.get(url, { withCredentials: true });
    setCustomer(result.data);
  };
  useEffect(() => {
    const cartString = sessionStorage.getItem("cart");
    // if (cartString !== null) {
    //   const carts = JSON.parse(cartString);
    //   console.log(carts[carts.length - 1].count);
    //   window.addEventListener("storage", () => {
    //     handleStorageChange();
    //   });
    // }
    if (cartString !== null) {
      setCart(JSON.parse(cartString));
      const productsCount = JSON.parse(cartString).reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.count,
        0
      );
      setTotalCount(productsCount);
    }
    if (email) {
      console.log("abc");
      fetchUserData(email);
    }
    if (action) {
      toast({
        title: "Update Profile successful",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    }
    // window.addEventListener("storage", () => {
    //   handleStorageChange();
    // });
    // return () => {
    //   window.removeEventListener("storage", handleStorageChange);
    // };
  }, []);
  useEffect(() => {
    const findData = async () => {
      // const formData = new FormData();
      // formData.append("keyword", keyword);
      const result = await axios.get(
        `${process.env.REACT_APP_SERVER}store/findByName/${keyword}`,
        { withCredentials: true }
        // formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      setSearchResult(result.data);
    };
    if (keyword !== "") {
      findData();
    } else {
      setSearchResult([]);
    }
  }, [keyword]);
  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const logoutBackEnd = async () => {
      Cookies.remove("email");
      Cookies.remove("position");
      await axios.post(`${process.env.REACT_APP_SERVER}users/logout`, email);
      history.push("/store/login");
    };
    logoutBackEnd();
  };
  const handleStorageChange = () => {
    const cartString = sessionStorage.getItem("cart");
    if (cartString !== null) {
      setCart(JSON.parse(cartString));
    }
    const productsCount = cart.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.count,
      0
    );
    setTotalCount(productsCount);
  };
  const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };

  return (
    <Flex w="80%" m="auto" justify="space-around" alignItems="center">
      <Link to="/store">
        <Image
          src={`${process.env.PUBLIC_URL}/page-logo.png`}
          boxSize="4rem"
          display="block"
        />
      </Link>
      <SearchModal
        keyword={keyword}
        changeKeyword={changeKeyword}
        searchResult={searchResult}
      />
      <Flex>
        <Link to="/cart">
          <Icon as={MdShoppingCart} d="inline" boxSize="2rem" />
          <Text d="inline">Your Cart has {totalCount} products</Text>
        </Link>
      </Flex>
      <Flex alignItems="center">
        {email !== undefined &&
        position !== undefined &&
        parseInt(position, 10) === 3 ? (
          <>
            <Menu>
              <MenuButton>
                <Flex alignItems="center">
                  <Icon
                    as={FaUserCircle}
                    color="white"
                    boxSize="2rem"
                    mr="1rem"
                  />
                  <Box>
                    <Text>Hello </Text>
                    <Text>{email}</Text>
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Box onClick={onOpen}>Profile</Box>
                </MenuItem>
                <MenuItem>
                  <Link to="/store/orderHistory">Order History</Link>
                </MenuItem>

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose} size="5xl">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <UserForm
                    type="customer"
                    user={customer}
                    closeModal={onClose}
                    containPassword
                  />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Icon as={FaUserCircle} color="white" boxSize="2rem" mr="1rem" />
            <Stack>
              <Box>
                <Link to="/store/login">Login</Link>
              </Box>
              <Box>
                <Link to="/store/register">Register</Link>
              </Box>
            </Stack>
          </>
        )}
      </Flex>
    </Flex>
  );
};
export default MenuBarContainer;
