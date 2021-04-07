$(document).ready(() => {
  const anchor = 'wrap';

  $('#root').empty().append(`
<div
  class="wrap"
  id="${anchor}"
>
  <div class="title noselect">
    Torrents P2P testing
  </div>
  <button
    class="mt-16 noselect"
    id="seed"
    type="button"
  >
    Seed file
  </button>
  <button
    class="mt-16 noselect"
    id="download"
    type="button"
  >
    Download file
  </button>
</div>  
  `);

  $('#download').on('click', () => download(anchor));
  $('#seed').on('click', () => seed(anchor));
});
