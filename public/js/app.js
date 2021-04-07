const anchor = '#root';

$(document).ready(() => {
  $('#root').empty().append(`
<div>
  <button
    id="download"
    type="button"
  >
    Download
  </button>
  <button
    id="upload"
    type="button"
  >
    Upload
  </button>
</div>  
  `);

  $('#download').on('click', download);
  $('#upload').on('click', upload);
});
