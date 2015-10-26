var mainImage = {};

var gallery = (function() {

  var config = {
    mainGallery: 'eGallery',
    previewSize: 120,
    showCount:   3,
    useFullScreen: true
  };
  var main = document.getElementById( config.mainGallery );
  var blackScreen, blackScreenPreview = '';

  function exchangeElements(e1, e2) {
      var tmp = e1.src
      e1.src = e2.src;
      e2.src = tmp;
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

    blackScreenPreview = document.createElement('div');
    blackScreenPreview.id = 'blackScreenPreview';
    blackScreenPreview.style.position = 'fixed';
    blackScreenPreview.style.left = 0;
    blackScreenPreview.style.zIndex = 20;
    blackScreenPreview.style.margin = 'auto';

    blackScreen.appendChild( blackScreenPreview );


    blackScreen.addEventListener("click", function(event){
      
      if (!!blackScreenPreview){
        return false;
        console.log('++');
      }

      if (blackScreen.parentNode) {
        blackScreen.parentNode.removeChild(blackScreen);
      }
      if ( this.style.display != 'none' ) {
        this.onclick = null;
        this.style.display = 'none';
      };
    });

    var images = main.getElementsByTagName('img');
    var _index = 0;

    
    // var mainImage = {};
    // то на что кликнули, главная картинка
    for (var i = images.length - 1; i >= 0; i--) {
      var image = document.createElement('img');

      var offset = (window.innerWidth/100)*24;
      var imageOffset = offset/images.length;

      console.log(offset, imageOffset);
      
      // ставим картинку на которую кликнули
      if ( images[i].src == localImage.src ) {
        mainImage = images[i];
        image.src = images[i].src;
        image.style.position = 'fixed';
        image.id = 'mainImage';
        image.style.top = '0';
        image.style.left = '0';
        image.style.right = '0';
        image.style.margin = '1% auto';
        image.style.zIndex = 20;
        image.style.height = '84%';
        blackScreen.appendChild(image);
      }


      var image = document.createElement('img');

      switch (i) {
        case 0:
          image.className = config.mainGallery+'Last'
          break
        case images.length - 1:
          image.className = config.mainGallery+'First'
          break
        default:
          image.className = config.mainGallery+'Other'
          break;
      };

      image.src = images[i].src;
      image.style.position = 'fixed';
      image.style.top = '88%';
      image.style.height = '10%';
      image.style.zIndex = 4;
      image.style.left = offset + (i*(imageOffset+image.naturalWidth*0.06))+'px';
      image.style.marginRight = offset;
      
      if ( images[i].src == localImage.src ) {
        image.style.border = '2px solid white';
        image.style.borderRadius = '2px';
      };
      
      image.onclick = function(){
        console.log(this);
        var mainImage = document.getElementById('mainImage');
        exchangeElements(image, mainImage);

        // document.getElementById('blackScreen').style.pointerEvents = 'auto'; 
      };

      blackScreenPreview.appendChild(image);

    };


    document.body.appendChild( blackScreen );
  };

//   #popup
// {
//     left: 30%;
//     top: 40%;
//     background-color: #FFF;
//     z-index: 222;
//     width: 300px;
//     height: 200px;
//     position: fixed;
// }

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