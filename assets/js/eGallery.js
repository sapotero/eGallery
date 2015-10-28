var mainImage = {};

var gallery = (function() {

  var config = {
    mainGallery:   'eGallery',
    previewSize:   120,
    previewCount:  6,
    useFullScreen: true
  };
  var main = document.getElementById( config.mainGallery );
  var blackScreen, blackScreenPreview = '';

  function imageClearBorder(){
    var main = document.getElementById('blackScreenPreview');
    var images = main.getElementsByTagName('img');
    for (var i = images.length - 1; i >= 0; i--) {
      images[i].style.border = '';
    };
  }

  function drawCorner(_index){
    var images = main.getElementsByTagName('img');
    var img = document.getElementById('blackScreenPreview').getElementsByTagName('img')[_index];
    imageClearBorder();
    img.style.border="1px solid white";
    document.getElementById('mainImage').src = images[_index].src;
  }
  // собственно тут все и происходит
  var createBlackScreen = function(localImage){
    var localImage = localImage;
    console.log('localImage: ',localImage);

    blackScreen = document.createElement('div');
    blackScreen.id = 'blackScreen';
    blackScreen.style.position = 'fixed';
    blackScreen.style.top = 0;
    blackScreen.style.left = 0;
    blackScreen.style.background = 'rgba(0,0,0,0.6)';
    blackScreen.style.zIndex = 50;
    blackScreen.style.width = '100%';
    blackScreen.style.height = '100%';
    // blackScreen.style.display = 'none';

    blackScreenClose = document.createElement('div');
    blackScreenClose.id = 'blackScreenClose';
    blackScreenClose.style.position = 'fixed';
    // blackScreenClose.innerHTML = '<p>X</p>';
    blackScreenClose.style.top = 0;
    blackScreenClose.style.left = "80%";
    blackScreenClose.style.zIndex = 45;
    blackScreenClose.style.width = '20%';
    blackScreenClose.style.height = '100%';

    blackScreenPrev = document.createElement('div');
    blackScreenPrev.id = 'blackScreenPrev';
    blackScreenPrev.style.position = 'fixed';
    // blackScreenPrev.innerHTML = '<p>X</p>';
    blackScreenPrev.style.top = 0;
    blackScreenPrev.style.left = 0;
    blackScreenPrev.style.zIndex = 45;
    blackScreenPrev.style.width = '20%';
    blackScreenPrev.style.height = '100%';

    blackScreenPreview = document.createElement('div');
    blackScreenPreview.id = 'blackScreenPreview';
    blackScreenPreview.style.position = 'fixed';
    blackScreenPreview.style.left = 0;
    blackScreenPreview.style.zIndex = 20;
    blackScreenPreview.style.margin = 'auto';

    blackScreen.appendChild( blackScreenPrev );
    blackScreen.appendChild( blackScreenPreview );
    blackScreen.appendChild( blackScreenClose );


    blackScreenPrev.addEventListener("click", function(event){
      if(_index >= 1 && _index <= images.length-1){
        this.src = images[_index].src
        _index--;
      } else {
        _index = images.length-1;
        this.src = images[_index].src;
      }

      drawCorner(_index);
    });

    blackScreenClose.addEventListener("click", function(event){
      var blackScreen = document.getElementById('blackScreen');
      if ( !!!blackScreen ) {
        createBlackScreen( this );
      } else {
        if (blackScreen.parentNode) {
          blackScreen.parentNode.removeChild(blackScreen);
        }
      };
    });


    var images = main.getElementsByTagName('img');
    var _index = 0;

    
    // var mainImage = {};
    // то на что кликнули, главная картинка

    var offset = (window.innerWidth/100)*20;
    var previewWidth = window.innerWidth - 2*offset;
    var imageOffset = previewWidth/config.previewCount;

    console.log(offset, previewWidth, imageOffset)

    for(var i = 0; i < images.length; i++) {
      var image = document.createElement('img');
      // ставим картинку на которую кликнули
      if ( images[i].src == localImage.src ) {
        _index = i;
        image.src = images[i].src;
        image.style.position = 'fixed';
        image.id = 'mainImage';
        image.style.top = '0';
        image.style.left = '0';
        image.style.right = '0';
        image.style.margin = '1% auto';
        image.style.zIndex = 20;
        image.style.height = '82%';
        blackScreen.appendChild(image);

        image.addEventListener("click", function(event){
          if(_index >= 0 && _index < images.length-1){
            this.src = images[_index+1].src
            _index++;
          } else {
            _index = 0;
            this.src = images[_index].src;
          }
          drawCorner(_index);
        });
      }

      var image = document.createElement('img');

      image.className = config.mainGallery+'Preview'

      image.src = images[i].src;
      image.style.position = 'fixed';
      image.style.top = '84%';
      // image.style.height = '10%';
      image.style.width = imageOffset*0.85+'px';
      image.style.zIndex = 4;
      image.style.left = offset + (i)*imageOffset+'px';
      image.style.margin = "0.75% auto";
      image.style.borderRadius = '2px';
      
      if ( images[i].src == _index ) {
        image.style.border = '2px solid white';
      };
      
      image.onclick = function(){
        imageClearBorder();
        this.style.border = '2px solid white';
        document.getElementById('mainImage').src = this.src;
      };

      blackScreenPreview.appendChild(image);

    };


    document.body.appendChild( blackScreen );
  };

  // Если есть элемент с айдишником из конфига
  if (!!main) {
    var localImages = main.getElementsByTagName('img');

    for (var i = localImages.length - 1; i >= 0; i--) {
      localImages[i].style.width = config.previewSize + 'px';
      
      localImages[i].onclick = function(){
        var blackScreen = document.getElementById('blackScreen');
        if ( !!!blackScreen ) {
          createBlackScreen( this );
        } else {
          if (blackScreen.parentNode) {
            blackScreen.parentNode.removeChild(blackScreen);
          }
        };
      };
    };
  };

  return {
    config: function(args){
      config = args;
    },
    showConfig: function(){
      return console.log('config:', config)
    },
    getImageCount: function() {
      return images.length;
    },
    getRoot: function() {
      return main;
    },
    createBlackScreen: function() {
      return createBlackScreen();
    }
  }
}());