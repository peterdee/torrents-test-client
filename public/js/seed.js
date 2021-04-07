async function seed(anchor = '') {
  $(`#${anchor}`).empty().append(`
<div class="title noselect">
  Select an audio file to seed
</div>  
<form
  class="mt-16 noselect"
  id="file-selector"
>
  <input
    accept="audio/*"
    id="file-input"
    type="file"
  />
  <button type="submit">
    Seed file
  </button>
</form>
<div id="seeding-status"></div>
  `);

  $('#file-selector').on('submit', async (event) => {
    event.preventDefault();

    $('#file-selector').attr('disabled', true);
    try {
      const TorrentServer = new WebTorrent();

      const file = $('#file-input')[0].files[0];
      const magnetPromise = new Promise((resolve) => TorrentServer.seed(
        file,
        {
          filterJunkFiles: true,
          private: true,
        },
        (torrent) => resolve(torrent.magnetURI),
      ));
      const magnet = await magnetPromise;

      const encoded = btoa(magnet).trim();
      $('#seeding-status').empty().append(`
<div class="seeding-status mt-16 noselect">
  Seeding the file: ${file.name}
</div>
<div class="seeding-info mt-16 noselect">
  Copy the string below to be able to download the seeded file on another device!      
</div>
<div class="seeding-info mt-16 noselect">
  Your file will be seeded as long as you keep this browser tab opened!     
</div>
<textarea disabled class="mt-16">${encoded}</textarea>      
      `);
    } catch (error) {
      console.log(error);
    }
  });
};
