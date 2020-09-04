mexui.util.createControlConstructor('Day', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Day', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Day, mexui.Control.TextInput);

// model
mexui.Control.Day.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 0 || _int > 31)
		return false;
	
	return true;
};