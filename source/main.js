if(window.Pseudo3D){
	alert('Pseudo3D already defined');
}else{
	require(['Pseudo3D'],function(Pseudo3D){
		window.Pseudo3D = Pseudo3D;
	},null,true);
}