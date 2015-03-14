#Install Instructions

Drag/drop the following JavaScript code onto your bookmarks toolbar:
```javascript
javascript:(function(){var%20a=function(){};if(typeof%20MyLib=="undefined"){var%20b=["https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js","https://raw.githubusercontent.com/akiller/ocuk-shopping-cart-to-forum-converter/master/ocuk.js"];var%20c=function(){if(b.length>0){var%20d=document.createElement("script");d.src=b.shift();document.body.appendChild(d);var%20e=false;d.onload=d.onreadystatechange=function(){if(!e&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){e=true;d.onload=d.onreadystatechange=null;c()}}}else{a()}};c()}else{a()}})()
```
**note: make sure you scroll all the way to the end**

Done!

##Internet Explorer 11

If using Internet Explorer 11 you need to disable Protected Mode to drag/drop the bookmarklet into your bookmarks toolbar.

1. Go to *Tools* > *Internet options* (press left <kbd>Alt</kbd> key to show the menu bar)
2. Go to the *Security* tab
3. Uncheck *Enable Protected Mode*
4. Restart your browser

Alternatively, without disabling protected mode:

1. Add a new bookmark and make sure you select to create it in *Favourites* > *Favourites bar*
2. Copy the JavaScript code above to your clipboard: __note: you have to scroll across to copy it all; the easiest way is to *right-click* > *select-all* then *right-click* > *copy*__
3. Right-click on the bookmark you created earlier and go to *Properties*
4. Paste your clipboard contents into the *URL* field
5. Go to the *General* tab and change the name to whatever you like

#More
* [Project Home](https://github.com/akiller/ocuk-shopping-cart-to-forum-converter)
* [Forum Help Thread](http://forums.overclockers.co.uk/showthread.php?p=21195107)