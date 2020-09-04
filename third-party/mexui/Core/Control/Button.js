mexui.util.createControlConstructor('Button', false, function(window, x, y, w, h, text, styles, callback)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('Button', styles), callback);
	
	this.text				= text;
});

// default styles
mexui.util.linkBaseControlStyles('Button', {});

// input
mexui.Control.Button.prototype.onMouseDown = function(e)
{
	if(this.isCursorOverControl())
	{
		e.used = true;
		this.checkToCallCallback();
	}
};

// render
mexui.Control.Button.prototype.render = function()
{
	var pos = this.getScreenPosition();
	
	mexui.native.drawRectangle(pos, this.size, this.getStyles('main'));
	mexui.native.drawText(pos, this.size, this.text, this.getStyles('main'));
};