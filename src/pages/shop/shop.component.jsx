import React from "react";
import { Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

const ShopPage = ({ match }) => (
    <div className="shop-page">
        
        <Route exact path={`${match.path}`} element={<CollectionsOverview />}></Route>
        <Route path={`${match.path}/:categoryId`} element={CollectionPage} ></Route>
    </div>
);

export default ShopPage; 