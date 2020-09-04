mexui.util.createControlConstructor('Month', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Month', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Month, mexui.Control.TextInput);

// model
mexui.Control.Month.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 0 || _int > 11)
		return false;
	
	return true;
};