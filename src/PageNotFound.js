import React from 'react';
import { useParams } from "react-router-dom";

const PageNotFound = () =>{
    const params = useParams()
    return(
        <div style={{justifyContent:'center',alignSelf:'center'}}>
            <h4><h1> "{params.pagename}" </h1> Page Not Found</h4>
        </div>
    );
}
export default PageNotFound;