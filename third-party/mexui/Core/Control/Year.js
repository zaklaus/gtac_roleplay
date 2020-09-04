mexui.util.createControlConstructor('Year', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Year', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Year, mexui.Control.TextInput);

// model
mexui.Control.Year.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 1900 || _int > 2019)
		return false;
	
	return true;
};