//用来处理RGB

export function getComputedValue(N,target){
    var cur = window.getComputedStyle(N)
    var colorRGB = cur[target].split(')')[0]
    var rgb = rgbDecompose(colorRGB)
	return rgb	
}
export function rgbDecompose(rgb){
	rgb = rgb.split(',')
    rgb[0] = rgb[0].substr(rgb[0].indexOf('(')+1)
    
	return rgb
}
export function rgbCombine(rgb){
	return 	'rgb(' + rgb.join(',') + ')'
}

