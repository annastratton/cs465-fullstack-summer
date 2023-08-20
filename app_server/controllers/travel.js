const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

const renderPage = (req, res, responseBody, title) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else if (!responseBody.length) {
        message = 'No trips exist in our database!';
    }
    res.render('travel', {
        title: `${title} - Travel`,
        trips: responseBody,
        message
    });
};

/* GET travel list view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.info(`>> travelController.travelList calling ${requestOptions.url}`);
    request(requestOptions, (err, { statusCode }, body) => {
        if (err) {
            console.error(err);
        }
        const title = process.env.npm_package_description;
        renderPage(req, res, body, title);
    });
};

module.exports = {
    travelList
};
