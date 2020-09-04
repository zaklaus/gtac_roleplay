mexui.util.createControlConstructor('Week', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Week', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Week, mexui.Control.TextInput);

// model
mexui.Control.Week.prototype.validateInputCallback = function(e, character)
{
	var _int = parseInt(character);
	
	if(isNaN(_int))
		return false;
	
	if(_int < 0 || _int > 51)
		return false;
	
	return true;
};