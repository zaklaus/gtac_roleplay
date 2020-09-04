mexui.util.createControlConstructor('RadioButton', false, function(window, x, y, w, h, groupId, text, styles, callback)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('RadioButton', styles), callback);
	
	this.groupId			= groupId;
	this.text				= text;
	
	this.checked			= this.isFirstRadioInGroup();
	this.textMarginLeft		= 5;
});

// default styles
mexui.util.linkBaseControlStyles('RadioButton', {
	innerBox:
	{
		backgroundColour:	toColour(0, 255, 0, 255)
	}
});

// input
mexui.Control.RadioButton.prototype.onMouseDown = function(e)
{
	if(this.isCursorOverControl())
	{
		var checkedRadio = this.getCheckedRadio();
		if(checkedRadio != this.checked)
			checkedRadio.checked = false;
		this.checked = !this.checked;
		this.checkToCallCallback();
	}
};

// render
mexui.Control.RadioButton.prototype.render = function()
{
	var pos = this.getScreenPosition();
	
	mexui.native.drawRectangle(pos, this.size, this.getStyles('main'));
	
	if(this.checked)
		mexui.native.drawRectangle(mexui.util.addVec2(pos, new Vec2(2, 2)), new Vec2(this.size.x - 4, this.size.y - 4), this.getStyles('innerBox'));
	
	mexui.native.drawText(mexui.util.addVec2(pos, new Vec2(this.size.x + this.textMarginLeft, 2)), this.size, this.text, this.getStyles('main'));
};

// model
mexui.Control.RadioButton.prototype.getSizeForInput = function()
{
	var textWidth = mexui.native.getTextWidth(this.text, this.getStyles('main'));
	return new Vec2(this.size.x + this.textMarginLeft + textWidth, this.size.y);
};

mexui.Control.RadioButton.prototype.getGroupRadios = function()
{
	var radios = [];
	var windows = mexui.windows;
	for(var i in windows)
	{
		var window = mexui.windows[i];
		
		for(var i2 in window.controls)
		{
			var control = window.controls[i2];
			
			if((control instanceof mexui.Control.RadioButton) && this.groupId == control.groupId)
			{
				radios.push(control);
			}
		}
	}
	return radios;
};

mexui.Control.RadioButton.prototype.getCheckedRadio = function()
{
	var radios = this.getGroupRadios();
	for(var i in radios)
	{
		if(radios[i].checked)
			return radios[i];
	}
	return null;
};

mexui.Control.RadioButton.prototype.isFirstRadioInGroup = function()
{
	return this.getGroupRadios().length == 0;
};