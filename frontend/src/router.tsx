import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProductListPage from "pages/ProductListPage";
import LoginPage from "pages/LoginPage";
import axios from "axios";
import Cookies from "js-cookie";
import ReceiptFormPage from "pages/Receipts/ReceiptFormPage";
import ReceiptListPage from "pages/Receipts/ReceiptListPage";
import OrderListPage from "pages/Orders/OrderListPage";
import OrderFormPage from "pages/Orders/OrderFormPage";
import StorePage from "pages/Customer/StorePage";
import StoreProductPage from "pages/Customer/StoreProductPage";
import ManagerAuth from "components/auth/ManagerAuth";
import ManufacturerListPage from "pages/ManufacturerListPage";
import StaffAuth from "components/auth/StaffAuth";
import CustomerAuth from "components/auth/CustomerAuth";
import CartPage from "pages/Customer/CartPage";
import LoginFacebookPage from "pages/LoginFacebookPage";
import TimeStatisticPage from "pages/Statistic/TimeStatisticPage";
import ProductStatisticPage from "pages/Statistic/ProductStatisticPage";

export const Router: React.FC = () => {
  return (
    <Switch>
      <Route path="/login" exact>
        <LoginPage />
      </Route>
      <ManagerAuth path="/products">
        <ProductListPage />
      </ManagerAuth>
      <ManagerAuth path="/manufacturers">
        <ManufacturerListPage />
      </ManagerAuth>
      <StaffAuth path="/receipts/add">
        <ReceiptFormPage />
      </StaffAuth>
      <StaffAuth path="/receipts/update/:id">
        <ReceiptFormPage />
      </StaffAuth>

      <StaffAuth path="/receipts">
        <ReceiptListPage />
      </StaffAuth>
      <StaffAuth path="/orders/new">
        <OrderFormPage />
      </StaffAuth>
      <StaffAuth path="/orders/update/:id">
        <OrderFormPage />
      </StaffAuth>
      <StaffAuth path="/orders">
        <OrderListPage />
      </StaffAuth>

      <CustomerAuth path="/store/product/:id">
        <StoreProductPage />
      </CustomerAuth>
      <CustomerAuth path="/store">
        <StorePage />
      </CustomerAuth>
      <CustomerAuth path="/cart">
        <CartPage />
      </CustomerAuth>
      <ManagerAuth path="/loginFacebook">
        <LoginFacebookPage />
      </ManagerAuth>
      <ManagerAuth path="/timeStatistic">
        <TimeStatisticPage />
      </ManagerAuth>
      <ManagerAuth path="/productStatistic">
        <ProductStatisticPage />
      </ManagerAuth>
    </Switch>
  );
};
