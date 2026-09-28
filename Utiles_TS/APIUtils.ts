export class APIUtils {
    apiContext : any;
    loginPayload : string;
    constructor(apiContext : any, loginPayload : string) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken()  {
        const response = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
                data: this.loginPayload
            })
            const responseBody = await response.json();
            const token = responseBody.token;
             //Store the token in the environment variable for later use
                process.env.TOKEN = token;
            console.log(token);
            return token;
    }

    async createOrder(orderPayload : string) {
        let response={token : String, orderId : String};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': await response.token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseBody = await orderResponse.json();
        console.log(orderResponseBody);
        const orderId = orderResponseBody.orders[0];
        response.orderId = orderId;
        return response; 
    }}
 module.exports={APIUtils};    
