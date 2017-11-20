var modify = function(node,styleObj){
	for (let x in styleObj)
	{
		node.style[x] = styleObj[x]
	}
}

export default modify