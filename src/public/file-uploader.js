var VERSION = '0.1.0',
  URL_FILE_ANALYZER = '/api/analyze',
  l = console.log.bind(console),

  // onReady :: IO Callback
  onReady = function(fn) {
    window.onload = fn;
  },

  // listenTo :: IO DOMElement -> Callback
  listenTo = function(elem, cb) {
    if(elem.addEventListener) elem.addEventListener('submit', cb, true);
    else if(elem.attachEvent) elem.attachEvent('onsubmit', cb);
    else throw new Error('Browser not supported');
  },

  // post :: IO String, FormData, Callback
  post = function(url, data, cb) {
    var req = new XMLHttpRequest();

    req.open('POST', url, true);
    req.onload = function(res) { cb(res, req); };
    req.send(data);
  },

  // formSubmit :: IO
  formSubmit = function(ev) {
    ev.preventDefault();
    l('submitted');

    var elem = document.querySelectorAll('input[type=file]')[0],
        statusArea = document.getElementById('status');

    statusArea.innerHtml = '';
    if(elem.files.length>0) {
      post(URL_FILE_ANALYZER, new FormData(ev.target), function(res, req){
        var response = JSON.parse(req.response);

        statusArea.innerHTML = "File size: " + response.size;
        console.log(response);
      });
    }
    return false;
  },

  // bootstrap :: IO
  bootstrap = function() {
    var form = document.getElementById('file-uploader');
    if( form=== null ) throw new Error('Cannot find file uploader form.');
    form.onsubmit = false;
    listenTo(form, formSubmit);
  }

onReady(bootstrap);
