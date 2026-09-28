import {test as base} from '@playwright/test';
interface testDataForOrder {
    email: string;
    pass: string;
    productName: string;
}
export const customTest = base.extend<{testDataForOrder : testDataForOrder}>(     
    {
        testDataForOrder: {
            email: "gdheena1@gmail.com",
            pass: "Dheena@12",
            productName: "iphone 13 pro"
        }
    }
)
