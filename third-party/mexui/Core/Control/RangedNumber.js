mexui.util.createControlConstructor('RangedNumber', false, function(window, x, y, w, h, min, max, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('RangedNumber', styles), callback, false, false);
	
	this.min			= min === undefined ? 0.0 : min;
	this.max			= max === undefined ? 100.0 : max;
});
mexui.util.extend(mexui.Control.RangedNumber, mexui.Control.TextInput);

// model
mexui.Control.RangedNumber.prototype.validateInputCallback = function(e, character)
{
	var number = parseFloat(this.getTextWithNewCharacter(character));
	
	if(!isNaN(number))
		return false;
	
	if(number < this.min || number > this.max)
		return false;
	
	return true;
};