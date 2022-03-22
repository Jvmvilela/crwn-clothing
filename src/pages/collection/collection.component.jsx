import React from "react";
import { connect } from "react-redux";

import { useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';

import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss';


const CollectionPage = ( {collection} ) => {

    const { title, items } = collection;
    
    const { collectionId } = useParams();
     
    console.log("collectionId: " + collectionId);
    console.log(collection);
    return (
        <div className="collection-page">
            <h2 className="title">{ title }</h2>
            <div className="items">
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    //console.log("mapStateToProps:" + ownProps.collection.items[0].id);
    collection: selectCollection(ownProps.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);