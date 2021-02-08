const fetch = require('node-fetch');

const MESSENTE_API_USERNAME = '<api-username-here>';
const MESSENTE_API_PASSWORD = '<api-password-here>';
const SMS_NOTIFICATION_RECIPIENTS = ['+372512345678', '+372598765432']; // <-- add your SMS recipients here

async function sendSMS(text, recipients) {
    const baseURL = 'https://api2.messente.com/send_sms/?';

    for (const recipient of recipients) {
        const params = {
            username: MESSENTE_API_USERNAME,
            password: MESSENTE_API_PASSWORD,
            to: recipient,
            text,
        };

        const queryString = Object.keys(params)
            .map((key) => {
                return `${key}=${encodeURIComponent(params[key])}`;
            })
            .join('&');

        const url = `${baseURL}${queryString}`;

        const response = await fetch(url);
        const responseText = await response.text();

        console.log(response.status, response.statusText, responseText);
    }
}

async function main() {
    const elisaURL = 'https://www.elisa.ee/publicrest/manager/search';

    const elisaResponse = await fetch(elisaURL, {
        method: 'POST',
        headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            categoryName: 'konsoolid',
            consumerSegment: true,
            page: 1,
            pageSize: 24,
            selectedVendors: ['SONY'],
            parameterValueSelectionIds: [],
            parameterValueRangeSearchGroupIds: [],
            selectedColors: [],
            selectedPriceRanges: '300-1000',
            campaignCategories: [],
            sortOrder: { sortType: 'price', reversed: 'true' },
            filters: { price_range: { filterItems: [{ value: '300-1000' }] } },
            mainDeviceCategory: [],
            mainDeviceCategorys: [],
        }),
        timeout: 10_000,
    });

    if (elisaResponse.status === 200) {
        const responseBody = await elisaResponse.json();
        const products = responseBody.result || [];

        for (const product of products) {
            const { model, price, customerPrice, articleModelTranslations, storageCode, seoURL} = product;
            if (
                /CFI/gi.test(storageCode) ||
                /PlayStation\s?5|PS\s?5/gi.test(model) ||
                /PlayStation\s?5|PS\s?5/gi.test(storageCode) ||
                /PlayStation\s?5|PS\s?5/gi.test(articleModelTranslations.et)
            ) {
                const url = `https://pood.telia.ee${product.url}`;
                const message = `${articleModelTranslations.et}, hind: ${price}, kliendi hind: ${customerPrice} -> https://www.elisa.ee/seadmed/eraklient/konsoolid/${seoURL}`;
                console.log(message);
                await sendSMS(message, SMS_NOTIFICATION_RECIPIENTS);
            }
        }
    } else {
        console.log(elisaResponse.status, elisaResponse.statusText);
    }
}

main()
    .catch((err) => console.log(err))
    .then(() => {})
    .catch((err) => console.log(err));
