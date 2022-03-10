import React from "react";
//import { withRouter} from 'react-router-dom';

import { useNavigate } from "react-router-dom";

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl }) => {
    const navigate = useNavigate();

    return(
        //<div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}
        
        <div className={`${size} menu-item`} onClick={() => navigate(`${linkUrl}`)}
        >
            <div 
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="content">
                <h1 className="title">{ title }</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    )
};

export default MenuItem;
//export default withRouter(MenuItem);