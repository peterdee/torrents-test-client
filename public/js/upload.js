async function upload() {
  $('#root').empty().append(`
<form id="file-selector">
  <input
    id="file-input"
    type="file"
  />
  <button type="submit">
    Select
  </button>
</form>
<div id="seeding-status"></div>
  `);

  $('#file-selector').on('submit', async (event) => {
    event.preventDefault();

    try {
      const TorrentServer = new WebTorrent();

      const file = $('#file-input')[0].files[0];
      console.log(file);
      const magnetPromise = new Promise((resolve) => TorrentServer.seed(
        file,
        {
          filterJunkFiles: true,
          private: true,
        },
        (torrent) => resolve(torrent.magnetURI),
      ));
      const magnet = await magnetPromise;

      $('#seeding-status').empty().append(`
<div>Seeding ${file.name}</div>
<textarea>${magnet}</textarea>      
      `);
    } catch (error) {
      console.log('catched', error);
    }
  });
};
