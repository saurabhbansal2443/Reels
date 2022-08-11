import {Link} from "react-router-dom";

function PageNotFound(){

    return(
        <>
            <div class="d-flex justify-content-center">
            <strong>Error 404 Page Not Found</strong>
            </div>
            <div class="d-flex justify-content-center my-5">
          
           
            <Link to="/Login"> <button type="button" class="btn btn-secondary btn-lg ">Home </button></Link>
            </div>
          
        </>
    )
}

export default PageNotFound