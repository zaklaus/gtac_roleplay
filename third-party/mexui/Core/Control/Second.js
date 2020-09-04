mexui.util.createControlConstructor('Second', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Second', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Second, mexui.Control.TextInput);

// model
mexui.Control.Second.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 0 || _int > 59)
		return false;
	
	return true;
};