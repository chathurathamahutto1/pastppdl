const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
  try {
    const urlParam = event.queryStringParameters?.url || '';
    console.log(`Fetching URL: ${urlParam}`);

    const response = await axios.get(urlParam, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 5000
    });

    if (response.status !== 200) {
      console.log(`Failed to fetch page: Status ${response.status}`);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          creator: 'Chathura Hansaka',
          status: false,
          downloadLink: null,
          message: `Failed to fetch page: Status ${response.status}`
        })
      };
    }

    const $ = cheerio.load(response.data);
    const downloadLink = $('.button.cart-button a.btn').attr('href');

    if (!downloadLink) {
      console.log('No download link found');
      return {
        statusCode: 200,
        body: JSON.stringify({
          creator: 'Chathura Hansaka',
          status: false,
          downloadLink: null,
          message: 'No download link found on the page'
        })
      };
    }

    console.log(`Found download link: ${downloadLink}`);
    return {
      statusCode: 200,
      body: JSON.stringify({
        creator: 'Chathura Hansaka',
        status: true,
        downloadLink
      })
    };
  } catch (error) {
    console.error(`Error in scraper: ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        creator: 'Chathura Hansaka',
        status: false,
        downloadLink: null,
        message: `Error processing the page: ${error.message}`
      })
    };
  }
};
