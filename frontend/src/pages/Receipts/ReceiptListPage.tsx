import React from "react";
import MainLayout from "layouts/MainLayout";
import ReceiptListContainer from "containers/Receipts/ReceiptListContainer";

import { Redirect } from "react-router-dom";

const ReceiptListPage: React.FC = () => {
  return (
    <MainLayout>
      <ReceiptListContainer />
    </MainLayout>
  );
};

export default ReceiptListPage;
