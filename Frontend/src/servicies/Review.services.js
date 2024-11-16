import fetchData from "../utils/FetchData.js";
import envConfig from "../Config/envConfig.js";
class Review {
    async createProductReview(data={},productId){
        try {
            // data will look like : {rating, reviewText}
            const url = `${envConfig.serverBaseURI}/review/product/new/${productId}`;
            const responseData = await fetchData(url,data);
            console.log("product review creation status : "+ responseData);
            // more work will be here 
        } catch (error) {
            console.log(
                "Error while creating product review data :: review services.js :: services :- " +
                  error
              );
              throw new Error(
                "Error while creating product review data :: review services.js :: services :- " +
                  error
              );
        }
        return null;
    }   
    async deleteProductReview(reviewId){
        try {
            // reviewId in parameters
            const url = `${envConfig.serverBaseURI}/review/product/remove/${reviewId}`;
            const responseData = await fetchData(url);
            console.log("product review deletion status : " + responseData);
            // more work will be here 

        } catch (error) {
            console.log(
                "Error while deleting product review data :: review services.js :: services :- " +
                  error
              );
              throw new Error(
                "Error while deleting product review data :: review services.js :: services :- " +
                  error
              );
        }
        return null;
    }
    async updateProductReview(data={},reviewId){
        try {
            // data will look like : {rating, reviewText} and reviewId in parameters
            const url = `${envConfig.serverBaseURI}/review/product/update/${reviewId}`;
            const responseData = await fetchData(url,data);
            console.log("product review update status : "+responseData);
            // more work will be here 
        } catch (error) {
            console.log(
                "Error while updating product review data :: review services.js :: services :- " +
                  error
              );
              throw new Error(
                "Error while updating product review data :: review services.js :: services :- " +
                  error
              );
        }
        return null;
    }
    
}       
const review = new Review();
export default review;