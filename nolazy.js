/**
 * Sets the image src for those images that have a data attribute set with the value of an image file.
 */
(function() {

	var 	images  = document.querySelectorAll('img'),
		rxdata  = new RegExp('^data-'),
		rxclass = new RegExp('.*\\b(lazy|lazyload|pending)\\b.*'),
		rxext   = new RegExp('\.(bmp|gif|jpe?g|png|tiff?|webp)$', 'i'),
		i, x, y, attr, classes;

	for (i = 0; i < images.length; ++i) {

		var img = images[i];
		// patch: overwrite src with the largest option from data-srcset
		if (img.hasAttribute("data-srcset")) {

			try {
				var sizes = img.attributes["data-srcset"].value.split(',').map(i => ({
					src: i.trim().split(' ')[0],
					size: i.trim().split(' ')[1]
				}));
				var size = sizes.sort((a, b) => (a.size.length == b.size.length) ? a.size < b.size : a.size.length < b.size.length)[0];
				img.src = size.src;
				// if successful, clean up attributes
				img.removeAttribute("data-srcset");
				// console.log(sizes);
				console.log("largest image: " + size.size);
				if (img.hasAttribute("data-src"))
					img.removeAttribute("data-src");
				var classes = img.className.split(' ');
				// TODO: refactor, and why was it "++y"??
				// remove lazy and pending classes that may prevent showing the image
				for (y = 0; y < classes.length; y++) {
					if (rxclass.test(classes[y])) {
						img.classList.remove(classes[y]);
						console.log("removed class: " + classes[y]);
					}
				}
			} catch (e) {
				console.error(e);
			}
			continue;
		}
		// /patch

		for (x = 0; x < img.attributes.length; x++) {
			attr = img.attributes[x];

			if (rxdata.test(attr.nodeName)) {

				console.log(attr.nodeName + " = " + attr.nodeValue);
				if (rxext.test(attr.nodeValue)) {
					img.src = attr.nodeValue;
					classes = img.className.split(' ');
					// remove lazy and pending classes that may prevent showing the image
					for (y = 0; y < classes.length; y++) {
						if (rxclass.test(classes[y])) {
							img.classList.remove(classes[y]);
							console.log("removed class: " + classes[y]);
						}
					}

					break;
				}
			}
		}
	}
})();
