async function download(anchor = '') {
  $(`#${anchor}`).empty().append(`
<form id="download-form">
  <input
    id="magnet-input"
    placeholder="Magnet link"
    type="text"
  />
  <button type="submit">
    Download
  </button>
</form>
<div id="download-status"></div>
  `);

  $('#download-form').on('submit', async (event) => {
    event.preventDefault();

    try {
      const TorrentClient = new WebTorrent();

      const magnet = $('#magnet-input').val();

      TorrentClient.add(magnet, (torrent) => {
        // Got torrent metadata!
        console.log('Client is downloading:', torrent.infoHash)
      
        torrent.files.forEach(function (file) {
          file.appendTo('body');
        });
      });
    } catch (error) {
      console.log('catched', error);
    }
  });
};
