mexui.util.createControlConstructor('Hour', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Hour', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Hour, mexui.Control.TextInput);

// model
mexui.Control.Hour.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 0 || _int > 23)
		return false;
	
	return true;
};