import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";
import Categories from "../pages/Categories/Categories";
import Brand from "../pages/Brand/Brand";
import Products from "../pages/Products/Products";
import Blog from "../pages/Blog/Blog";
import Option from "../pages/Option/Option";
import Comments from "../pages/Comments/Comments";
import Login from "../pages/Login/Login";
import Employee from "../pages/Employee/Employee";
import Order from "../pages/Order/Order";

import Branch from "../pages/Branches/Branch";
import Tab from "../pages/Store/Tab";
import CategoryOption from "../pages/CategoryOption/CategoryOption";
import Voucher from "../pages/Voucher/Voucher";
import BranchWarranty from "../pages/BranchWarranty/BranchWarranty";
import Warranty from "../pages/Warranty/Warranty";
import InFoWarranty from "../pages/InFoWarranty/InFoWarranty";
import TabWarranty from "../pages/InFoWarranty/TabWarranty";
import FeedBack from "../pages/FeedBackComment/FeedBack";
const isLogin = localStorage.getItem("admin") ? true : false;

const Routes = () => {
  return (
    <Switch>
      {isLogin ? (
        <>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/employee" exact component={Employee} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/brand" exact component={Brand} />
          <Route path="/products" exact component={Products} />
          <Route path="/optionCategory" exact component={CategoryOption} />
          <Route path="/option" exact component={Option} />
          <Route path="/comment" exact component={Comments} />
          <Route path="/feedback" exact component={FeedBack} />
          <Route path="/blog" exact component={Blog} />
          <Route path="/orders" exact component={Order} />
          <Route path="/store" exact component={Tab} />
          <Route path="/branch" exact component={Branch} />
          <Route path="/discount" exact component={Voucher} />
          <Route
            path="/branchWarranty"
            exact
            component={BranchWarranty}
          ></Route>
          <Route path="/warranty" exact component={Warranty} />
          <Route path="/infoWarranty" exact component={TabWarranty} />
        </>
      ) : (
        <Redirect from="" to="login" />
      )}
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
