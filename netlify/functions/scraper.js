const cheerio = require('cheerio');

exports.handler = async (event) => {
  try {
    const urlParam = event.queryStringParameters?.url || '';
    console.log(`Processing URL: ${urlParam}`); // Log the URL for debugging

    // Use the provided HTML content (simulated as a parameter for this example)
    const html = `
<div class="container-md px-md-3 px-1">
  <div class="breadcrumbs mb-1">
    <div class="row align-items-center">
      <div class="col-lg-9 col-sm-6 col-12 ">
        <div class="breadcrumbs-content">
          <h1 class="page-title">G.C.E. Advance Level Exam 2018 Accounting Past Papers </h1>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6 col-12 d-flex justify-content-end d-sm-block d-none">
        <div class="button cart-button pe-2 d-flex justify-content-end">
          <a href="https://govdoc.lk/gce-advance-level-exam-2018-accounting-past-papers" class="btn">Back To Post</a>
        </div>
      </div>
    </div>
  </div>
  <section class="section">
    <div class="row mx-0">
      <div class="col-12 my-3" style="text-align: center">
        <script async="" src="js/adsbygoogle.js" crossorigin="anonymous"></script>
        <!-- govdoc responsive -->
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5272826017460586" data-ad-slot="2378650121" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-xl-12 col-lg-12 col-md-12 px-md-3 px-0">
        <div>
          <div id="adobe-dc-view"></div>
        </div>
        <div class="col-md-12 d-flex justify-content-center  mt-md-5 mt-4 mb-4 mx-3">
          <div class="button cart-button pe-sm-2">
            <a href="https://govdoc.lk/download/61cd7abfafa77" class="btn w-100" target="_blank">Download</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12 my-3" style="text-align: center">
        <script async="" src="js/adsbygoogle.js" crossorigin="anonymous"></script>
        <!-- govdoc responsive -->
        <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-5272826017460586" data-ad-slot="2378650121" data-ad-format="auto" data-full-width-responsive="true"></ins>
        <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>
      </div>
    </div>
  </section>
</div>
`;

    const $ = cheerio.load(html);
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
