import {buildPalette,onlyPalette} from './palette'



var start = function(){
	var colorList = document.getElementsByClassName('paletteC')
	var bgColorList = document.getElementsByClassName('paletteBC')
	
	colorList = reg(colorList,'color')
	bgColorList = reg(bgColorList,'background')
	
}


function reg(arr,target){
	if(arr.length){
		var tem = []
		for(let x = 0;x < arr.length;x++){
			tem[x] = new buildPalette(arr[x],target)
			tem[x].bindNode()
		}
		return tem
	}
}

export default start