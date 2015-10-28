var gallery = (function() {

  var config = {
    root: "eGallery",
    previewSize: '100px',
    previewWidth: '50em',
    previewHeight: '200px'
  };

  var main, root, images, error;
  var index = 0;

  var hide = function (){
    for (var i = images.length - 1; i >= 0; i--) {
      images[i].style.display = 'none';
    };
  }

  var checkConfiguration = function (){
    root = document.getElementById( config.root );
    if ( !!root ) {
      images = root.getElementsByTagName('img');
      if ( !!images && images.length ) {
        index = 0;
        
        main = document.createElement('div');
        main.className = 'eGalleryMain';
        root.style.width = config.previewWidth;
        // root.style.height = config.previewHeight;

        var style = document.createElement('style');

        root.appendChild(main);

        return true;
      }
    }
    return false;
  };

  var createPreview = function(images){
    for (var i = images.length - 1; i >= 0; i--) {
      // создаем разметку
      var li = document.createElement('li');

      var input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'slide');
      input.id = 'eGallerySlide'+i;
      if ( i == index ) {
        input.setAttribute('checked', 'true');
      };

      var label = document.createElement('label');
      label.setAttribute('for', 'eGallerySlide'+i );

      li.appendChild(input);
      li.appendChild(label);

      li.wrap(images[i]);
    }
  };

  var createStyle = function(){
    var css = '.eGallery img { height: auto; width: '+config.previewWidth+'; opacity: 0; transition: .25s; vertical-align: top; visibility: hidden; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

    for (var i = 1; i < images.length+1; i++) {
      css += '.eGallery:hover li:nth-child('+i+') label { left: '+(0.5+1.5*i)+'em; }';
    };

    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);
  };

  return {
    init: function(){
      if ( checkConfiguration() ) {
        createStyle();
        createPreview(images);
        console.log('+');
      };
    }
  }
}());

HTMLElement.prototype.wrap = function(elms) {
    if (!elms.length) elms = [elms];
    for (var i = elms.length - 1; i >= 0; i--) {
      var child = (i > 0) ? this.cloneNode(true) : this;
      var el    = elms[i];

      var parent  = el.parentNode;
      var sibling = el.nextSibling;

      child.appendChild(el);

      if (sibling) {
        parent.insertBefore(child, sibling);
      } else {
        parent.appendChild(child);
      }
    }
};