mexui.util.createControlConstructor('Image', false, function(window, x, y, w, h, filePath, styles)
{
	mexui.Component.Control.call(this, window, x, y, w, h, this.linkControlStyles('Image', styles));
	
	this.image				= mexui.native.loadImage(filePath);
});

// default styles
mexui.util.linkBaseControlStyles('Image', {});

// render
mexui.Control.Image.prototype.render = function()
{
	var pos = this.getScreenPosition();
	
	mexui.native.drawImage(pos, this.size, this.image, this.getStyles('main'));
};