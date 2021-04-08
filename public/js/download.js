async function download(anchor = '') {
  $(`#${anchor}`).empty().append(`
<div class="title noselect">
  Download seeded file
</div>  
<form
  class="mt-16"
  id="download-form"
>
  <textarea
    id="magnet-input"
    placeholder="Download string"
  ></textarea>
  <div
    class="error mt-16 noselect"
    id="download-error"
  ></div>
  <button
    class="download-button mt-16 noselect"
    type="submit"
  >
    Download
  </button>
</form>
<div
  class="download-progress mt-16 noselect"
  id="progress"
></div>
<div
  class="audio mt-16 noselect"
  id="audio"
></div>
<div
  class="audio mt-16 noselect"
  id="download-link"
></div>
  `);

  $('#download-form').on('submit', async (event) => {
    event.preventDefault();

    $('#download-error').empty();

    const encoded = $('#magnet-input').val();
    if (!(encoded && encoded.trim())) {
      return $('#download-error').append('Please provide the download string!');
    }

    let magnet = '';
    try {
      magnet = atob(encoded);
    } catch {
      return $('#download-error').append('Provided invalid download string!');
    }

    try {
      const TorrentClient = new WebTorrent();

      TorrentClient.add(
        magnet,
        (torrent) => {
          $('#download-form').css('display', 'none');
          torrent.on('download', () => $('#progress').empty().append(
            `Downloaded: ${Math.ceil(torrent.progress * 100)}%`
          ));
      
          torrent.files.forEach((file) => {
            file.appendTo('#audio');
            file.getBlobURL((error, blobURL) => {
              if (error) {
                return false;
              }

              $('#download-link').empty().append(`
<button
  id="download-file"
  type="button"
>
  Save file
</button>
              `);

              $('#download-file').on('click', () => {
                const a = document.createElement('a');
                document.body.appendChild(a);
                a.style = 'display: none';
                a.href = blobURL;
                a.download = file.name;
                a.click();
                return URL.revokeObjectURL(blobURL);
              });
            });
          },
        );
      });
    } catch (error) {
      console.log(error);
    }
  });
};
