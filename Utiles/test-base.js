const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder: {
            email: "gdheena1@gmail.com",
            pass: "Dheena@12",
            productName: "iphone 13 pro"
        }
    }
)