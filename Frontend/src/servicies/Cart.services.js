import fetchData from "../../utils/FetchData.js";
import envConfig from "../../Config/envConfig.js";

class CartServices{
    async addProductToCart(productId){
        try {
            const url = `${envConfig.serverBaseURI}/cart/add/${productId}`;
            const responseData = await fetchData(url,{},"POST");
            console.log("product added to cart status : "+responseData);   
        } catch (error) {
            console.log("Error while adding product to cart :: cart services.js :: services :- "+error);
            throw new Error("Error while adding product to cart :: cart services.js :: services :- "+error);
        }
    }
    async updateCartItemQuantity(productId, quantity) {
        try {
            // Validate quantity
            if (!Number.isInteger(quantity) || quantity < 1) {
                throw new Error("Quantity must be a positive integer");
            }   
            const MAX_QUANTITY = 99; // Define your max quantity limit
            if (quantity > MAX_QUANTITY) {
                throw new Error(`Quantity cannot exceed ${MAX_QUANTITY}`);
            }   
            const url = `${envConfig.serverBaseURI}/cart/update/${productId}`;
            const payload = {
                quantity: quantity
            };
            const responseData = await fetchData(url, payload, "PATCH");
            console.log("Cart quantity updated status: ", responseData);
            return responseData;
        } catch (error) {
            console.log("Error while updating cart quantity :: cart services.js :: services :- ", error);
            throw new Error("Error while updating cart quantity :: cart services.js :: services :- " + error);
        }
    }    
    async removeProductFromCart(productId){
        try {
            const url = `${envConfig.serverBaseURI}/cart/remove/${productId}`;
            const responseData = await fetchData(url,{},"DELETE");
            console.log("product removed from cart status : "+responseData);   
        } catch (error) {
            console.log("Error while removing product from cart :: cart services.js :: services :- "+error);
            throw new Error("Error while removing product from cart :: cart services.js :: services :- "+error);
        }
    }
}
const cart = new CartServices();
export default cart;    
