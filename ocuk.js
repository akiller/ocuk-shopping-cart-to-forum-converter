/*
*	Cross-browser Overclockers UK (OcUK) shopping cart to forum BB-Code converter bookmarklet backend
*	by Andrew Killer <akiller@gmail.com>
*	http://code.google.com/p/ocuk-shopping-cart-to-forum-converter
*
*	Rewrite/pilfer of Oliver UK's OcUK Shopping Cart Viewer (https://chrome.google.com/webstore/detail/empfloiadabicdlgahhamannadefhehj?gl=IN)
*
*	Bookmarklet template: http://stackoverflow.com/a/6235308/171703
*	Bookmarklet generator: http://userjs.up.seesaa.net/js/bookmarklet.html
*/

/*
*	Get next table row
*/
function getNextRow(currRow) {
    return $(currRow).next('tr');
};

/*
*	String format function
*	http://stackoverflow.com/a/2648463/171703
*/
String.prototype.format = String.prototype.f = function() {
    var s = this, i = arguments.length;
    while (i--) {s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);}
    return s;
};

/*
* Sanitise values for BBCode
*/ 
String.prototype.sanitiseBBCode = String.prototype.f = function() {
	return this.replace(/\[/g,'(').replace(/\]/g,')');
}

/*
*	Store gathered data as JSON object:
*/
var data = {
	cart_items : [],
	shipping_cost: 0,
	total_cost: 0,
};

/*
*	Build and parse information from shopping cart into data:
*/
var cartTable = $("#shoppingBkt");

cartTable.find('tr:gt(0)').not('.basket_option').not('.totalRow').not('#orderTotal').each(function() {

	var row = $(this);
	var productConfiguration = [];

	// Look for system configuration options
	var nextRow = getNextRow(row);
	while (nextRow.hasClass("basket_option")) {
		// a complete system with no option price or count
		if (nextRow.has('input').length > 0) {
			var rowItems = nextRow.children();
			productConfiguration.push({
				'type' : 'complete',
				'desc' : rowItems.eq(0).html().split('<br>')[1],
				'qty' : rowItems.eq(1).find('input:first').val(),
				'price' : rowItems.eq(2).find('.price').text(),
				'total' : rowItems.eq(3).find('.lineTotal').text()
			});
		}
		// a fully configurable build
		else {
			var productOptions = nextRow.find('td:first').html().split('<br>');
			for (var i=1; i<productOptions.length; i++) {
				var productDesc = productOptions[i].replace(' - ', '');

				if (productDesc.length > 0) {
					productConfiguration.push({
						'type' : 'configurable',
						'desc' :productOptions[i].replace(' - ', '')
					});
				}
			}
		}
		nextRow = getNextRow(nextRow);
	}

	var rowItems = row.children();
	data.cart_items.push({
		'image' : rowItems.eq(0).find('img:first').prop('src').replace(/http:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}\/bmi\//, "http://"),
		'desc' : rowItems.eq(1).text(),
		'configuration' : productConfiguration,
		'link' : rowItems.eq(1).find('a:first').prop('href'),
		'qty' : rowItems.eq(2).find('input:first').val(),
		'price' : rowItems.eq(3).find('.price').text(),
		'total' : rowItems.eq(4).find('.lineTotal').text()
	});
});

data.shipping_cost = cartTable.find("tr.totalRow:nth-child(1n)").eq("1").children('td:last').text();
data.total_cost = cartTable.find("tr#orderTotal").children('td:last').text();

/*
*	Turn data into BB code for forum
*/
var cartContents="", cartContentsFooter="";
jQuery.each(data.cart_items, function(i, item) {

	// Custom build configuration data
	var cartContentsConfiguration="";
	if (item.configuration.length > 0) {
		jQuery.each(item.configuration, function(j, configuration) {
			if (configuration.type == "complete") {
				cartContentsConfiguration += "\n[COLOR=\"Wheat\"] - {0} x {1}[/COLOR]  [b][COLOR=\"Yellow\"]{2}[/COLOR][/b]"
																 .format(configuration.qty.sanitiseBBCode(), configuration.desc.sanitiseBBCode(), configuration.price.sanitiseBBCode());
			} else {
				cartContentsConfiguration += "\n[COLOR=\"Wheat\"] - {0}[/COLOR]".format(configuration.desc.sanitiseBBCode());
			}
		});
	}

	cartContents += "{0} x [url=\"{1}\"]{2}[/url]  [b][COLOR=\"Yellow\"]{3}[/COLOR][/b]{4}{5}\n"
								.format(item.qty.sanitiseBBCode(), item.link.sanitiseBBCode(), item.desc.sanitiseBBCode(), item.price.sanitiseBBCode(), (item.qty > 1 ? " [b][COLOR=\"DarkOrange\"]({0})[/COLOR][/b]".format(item.total.sanitiseBBCode()) : ""), cartContentsConfiguration);

	if (item.image) cartContentsFooter += "[url=\"{0}\"][img]{1}[/img][/url] ".format(item.link.sanitiseBBCode(), item.image.sanitiseBBCode());
});

var cartBBCode = ("[COLOR=\"Yellow\"][b]YOUR BASKET[/b][/COLOR]\n{0}[b]Total : [COLOR=\"Yellow\"]{1}[/COLOR][/b] (includes shipping : {2}).\n\n{3}\n").format(cartContents, data.total_cost.sanitiseBBCode(), data.shipping_cost.sanitiseBBCode(), cartContentsFooter);

/*
*	Display to users (somewhat of a hack thanks to no clipboard support from JavaScript without Flash or Internet Explorer)
*/
var dataPlacementLocation = $("#maincell #centre");

var OcUKBBGenerator = $("#OcUKBBGenerator");
if ((OcUKBBGenerator).length) {
	OcUKBBGenerator.find('textarea').val(cartBBCode);
} else {
	dataPlacementLocation.append("<div id=\"OcUKBBGenerator\"><h1 class=\"bigred\">Your Cart Contents BB-Code</h1><p>Copy and paste the following into the forums:</p><textarea id=\"OcUKBBGeneratorTextArea\" cols=\"130\" rows=\"20\" style=\"width:99%\" readonly=\"readonly\">" + cartBBCode + "</textarea></div>");
	OcUKBBGenerator = $("#OcUKBBGenerator");
}

$(window).scrollTop(OcUKBBGenerator.position().top)

if (window.clipboardData && window.clipboardData.getData)
	window.clipboardData.setData("Text", cartBBCode);
