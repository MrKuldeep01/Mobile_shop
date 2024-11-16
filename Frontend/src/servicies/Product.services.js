import fetchData from "../../utils/FetchData.js";
import envConfig from "../../Config/envConfig.js";
class Product {
    async getProductList(){
        try {
            const url = `${envConfig.serverBaseURI}/products`;
            const responseData = await fetchData(url);
            console.log("product list status : "+responseData);
    
            // more work will be here 
        } catch (error) {
            console.log(
              "Error while fetching product list data :: product services.js :: services :- " +
                error
            );
            throw new Error(
              "Error while fetching product list data :: product services.js :: services :- " +
                error
            );
          }
          return null;
    }
    async addProduct(data={}){
        try {
        // name, desc, model, catagory, price, quantity 
        const url = `${envConfig.serverBaseURI}/products/add`;
        const responseData = await fetchData(url, data);    
        console.log("add product status : "+responseData);
        // more work will be here 


       } catch (error) {
            console.log(
              "Error while adding product data :: product services.js :: services :- " +
                error
            );
            throw new Error(
              "Error while adding product data :: product services.js :: services :- " +
                error
            );
          }
          return null;
    }
    async editProduct(data={},productId){
        try {
            // name, desc, model, catagory, price, quantity 
            const url = `${envConfig.serverBaseURI}/products/edit/${productId}`;
            const responseData = await fetchData(url, data);    
            console.log("edit product status : "+responseData);
    
        }catch(error){
            console.log(
              "Error while editing product data :: product services.js :: services :- " +
                error
            );
            throw new Error(
              "Error while editing product data :: product services.js :: services :- " +
                error
            );
        }
        return null;
    }
    async getProductDetails(productId){
        try {
            const url = `${envConfig.serverBaseURI}/products/${productId}`;
            const responseData = await fetchData(url);
            console.log("get product details are : "+responseData);
            // more work will be here 

        } catch (error) {
            console.log(
              "Error while fetching product details data :: product services.js :: services :- " +
                error
            );
            throw new Error(
              "Error while fetching product details data :: product services.js :: services :- " +
                error
            );
        }
        return null;
    }
    async deleteProduct(productId){
        try {
            const url = `${envConfig.serverBaseURI}/products/delete/${productId}`;
            const responseData = await fetchData(url);
            console.log("delete product status : "+responseData);   
        } catch (error) {
            console.log(
              "Error while deleting product data :: product services.js :: services :- " +
                error
            );
            throw new Error(
              "Error while deleting product data :: product services.js :: services :- " +
                error
            );

        }
        return null;
    }   
}
const product = new Product();
export default product;