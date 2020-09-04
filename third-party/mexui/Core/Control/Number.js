mexui.util.createControlConstructor('Number', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Control.TextInput.call(this, window, x, y, w, h, text, this.linkControlStyles('Number', styles), callback, false, false);
});
mexui.util.extend(mexui.Control.Number, mexui.Control.TextInput);

// model
mexui.Control.Number.prototype.validateInputCallback = function(e, character)
{
	return !isNaN(parseFloat(this.getTextWithNewCharacter(character)));
};