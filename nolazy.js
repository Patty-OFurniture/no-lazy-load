/**
 * Sets the image src for those images that have a data attribute set with the value of an image file.
 */
 (function(){

    var images  = document.querySelectorAll('img'),
        rxdata  = new RegExp('^data-'),
        rxclass = new RegExp('.*\\b(lazy|pending)\\b.*'),
        rxext   = new RegExp('\.(gif|jpe?g|png)$'),
        i,
        x,
        y,
        attr,
        classes;

    for (i = 0; i < images.length; ++i) {

        for (x = 0; x < images[i].attributes.length; x++) {
            attr = images[i].attributes[x];

            if (rxdata.test(attr.nodeName)) {

                console.log(attr.nodeName + " = " + attr.nodeValue);

                if (rxext.test(attr.nodeValue)) {
                    images[i].src = attr.nodeValue;

                    classes = images[i].className.split(' ');

                    // remove lazy and pendign classes that may prevent showing the image
                    for (y = 0; y < classes.length; ++y) {

                        if (rxclass.test(classes[y])) {
                            images[i].classList.remove(classes[y]);
                            console.log("removed class: " + classes[y]);
                        }

                    }

                    break;
                }

            }

        }

    }

})();