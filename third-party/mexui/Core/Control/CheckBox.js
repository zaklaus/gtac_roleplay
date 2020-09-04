mexui.util.createControlConstructor('CheckBox', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('CheckBox', styles), callback);
	
	this.text				= text;
	
	this.checked			= false;
	this.textMarginLeft		= 5;
});

// default styles
mexui.util.linkBaseControlStyles('CheckBox', {
	innerBox:
	{
		backgroundColour:	toColour(0, 255, 0, 255)
	}
});

// input
mexui.Control.CheckBox.prototype.onMouseDown = function(e)
{
	if(this.isCursorOverControl())
	{
		e.used = true;
		this.checked = !this.checked;
		this.checkToCallCallback();
	}
};

// render
mexui.Control.CheckBox.prototype.render = function()
{
	var pos = this.getScreenPosition();
	
	mexui.native.drawRectangle(pos, this.size, this.getStyles('main'));
	
	if(this.checked)
		mexui.native.drawRectangle(mexui.util.addVec2(pos, new Vec2(1, 1)), new Vec2(this.size.x - 2, this.size.y - 2), this.getStyles('innerBox'));
	
	mexui.native.drawText(mexui.util.addVec2(pos, new Vec2(this.size.x + this.textMarginLeft, 2)), this.size, this.text, this.getStyles('main'));
};

// model
mexui.Control.CheckBox.prototype.getSizeForInput = function()
{
	var textWidth = mexui.native.getTextWidth(this.text, this.getStyles('main'));
	return new Vec2(this.size.x + this.textMarginLeft + textWidth, this.size.y);
};