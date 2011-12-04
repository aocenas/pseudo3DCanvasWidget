(function () {
/** * almond 0.0.2+ Copyright (c) 2011, The Dojo Foundation All Rights Reserved. * Available via the MIT or new BSD license. * see: http://github.com/jrburke/almond for details *//*jslint strict: false, plusplus: false *//*global setTimeout: false */var requirejs, require, define;(function () {    var defined = {},        aps = [].slice,        req;    if (typeof define === "function") {        //If a define is already in play via another AMD loader,        //do not overwrite.        return;    }    /**     * Given a relative module name, like ./something, normalize it to     * a real name that can be mapped to a path.     * @param {String} name the relative name     * @param {String} baseName a real name that the name arg is relative     * to.     * @returns {String} normalized name     */    function normalize(name, baseName) {        //Adjust any relative paths.        if (name && name.charAt(0) === ".") {            //If have a base name, try to normalize against it,            //otherwise, assume it is a top-level require that will            //be relative to baseUrl in the end.            if (baseName) {                //Convert baseName to array, and lop off the last part,                //so that . matches that "directory" and not name of the baseName's                //module. For instance, baseName of "one/two/three", maps to                //"one/two/three.js", but we want the directory, "one/two" for                //this normalization.                baseName = baseName.split("/");                baseName = baseName.slice(0, baseName.length - 1);                name = baseName.concat(name.split("/"));                //start trimDots                var i, part;                for (i = 0; (part = name[i]); i++) {                    if (part === ".") {                        name.splice(i, 1);                        i -= 1;                    } else if (part === "..") {                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {                            //End of the line. Keep at least one non-dot                            //path segment at the front so it can be mapped                            //correctly to disk. Otherwise, there is likely                            //no path mapping for a path starting with '..'.                            //This can still fail, but catches the most reasonable                            //uses of ..                            break;                        } else if (i > 0) {                            name.splice(i - 1, 2);                            i -= 2;                        }                    }                }                //end trimDots                name = name.join("/");            }        }        return name;    }    function makeRequire(relName, forceSync) {        return function () {            //A version of a require function that passes a moduleName            //value for items that may need to            //look up paths relative to the moduleName            return req.apply(null, aps.call(arguments, 0).concat([relName, forceSync]));        };    }    function makeNormalize(relName) {        return function (name) {            return normalize(name, relName);        };    }    function makeLoad(depName) {        return function (value) {            defined[depName] = value;        };    }    /**     * Makes a name map, normalizing the name, and using a plugin     * for normalization if necessary. Grabs a ref to plugin     * too, as an optimization.     */    function makeMap(name, relName) {        var prefix, plugin,            index = name.indexOf('!');        if (index !== -1) {            prefix = normalize(name.slice(0, index), relName);            name = name.slice(index + 1);            plugin = defined[prefix];            //Normalize according            if (plugin && plugin.normalize) {                name = plugin.normalize(name, makeNormalize(relName));            } else {                name = normalize(name, relName);            }        } else {            name = normalize(name, relName);        }        //Using ridiculous property names for space reasons        return {            f: prefix ? prefix + '!' + name : name, //fullName            n: name,            p: plugin        };    }    function main(name, deps, callback, relName) {        var args = [],            usingExports,            cjsModule, depName, i, ret, map;        //Use name if no relName        if (!relName) {            relName = name;        }        //Call the callback to define the module, if necessary.        if (typeof callback === 'function') {            //Pull out the defined dependencies and pass the ordered            //values to the callback.            if (deps) {                for (i = 0; i < deps.length; i++) {                    map = makeMap(deps[i], relName);                    depName = map.f;                    //Fast path CommonJS standard dependencies.                    if (depName === "require") {                        args[i] = makeRequire(name);                    } else if (depName === "exports") {                        //CommonJS module spec 1.1                        args[i] = defined[name] = {};                        usingExports = true;                    } else if (depName === "module") {                        //CommonJS module spec 1.1                        cjsModule = args[i] = {                            id: name,                            uri: '',                            exports: defined[name]                        };                    } else if (depName in defined) {                        args[i] = defined[depName];                    } else if (map.p) {                        map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});                        args[i] = defined[depName];                    }                }            }            ret = callback.apply(defined[name], args);            if (name) {                //If setting exports via "module" is in play,                //favor that over return value and exports. After that,                //favor a non-undefined return value over exports use.                if (cjsModule && cjsModule.exports !== undefined) {                    defined[name] = cjsModule.exports;                } else if (!usingExports) {                    //Use the return value from the function.                    defined[name] = ret;                }            }        } else if (name) {            //May just be an object definition for the module. Only            //worry about defining if have a module name.            defined[name] = callback;        }    }    requirejs = req = function (deps, callback, relName, forceSync) {        if (typeof deps === "string") {            //Just return the module wanted. In this scenario, the            //deps arg is the module name, and second arg (if passed)            //is just the relName.            //Normalize module name, if it contains . or ..            return defined[makeMap(deps, callback).f];        } else if (!deps.splice) {            //deps is a config object, not an array.            //Drop the config stuff on the ground.            if (callback.splice) {                //callback is an array, which means it is a dependency list.                //Adjust args if there are dependencies                deps = callback;                callback = arguments[2];            } else {                deps = [];            }        }        //Simulate async callback;        if (forceSync) {            main(null, deps, callback, relName);        } else {            setTimeout(function () {                main(null, deps, callback, relName);            }, 15);        }        return req;    };    /**     * Just drops the config on the floor, but returns req in case     * the config return value is used.     */    req.config = function () {        return req;    };    /**     * Export require as a global, but only if it does not already exist.     */    if (!require) {        require = req;    }    define = function (name, deps, callback) {        //This module may not have dependencies        if (!deps.splice) {            //deps is not an array, so probably means            //an object literal for the value. Adjust args.            callback = deps;            deps = [];        }        main(name, deps, callback);    };    define.amd = {        jQuery: true    };}());
define("../lib/almond", function(){});

define('console',[],function (){
	
	if (!window.console) console = {};
	console.log = console.log || function(){};
  
	// Comment this line if you want console logs.
	//console.log = function(){};
	  
	return console;
});
/*
 * Point object do define some point in space with coordinates and diameter.
 */
define('Point',['console'],function (console){
	
	/*
	 * Constructor. Takes coordinates, diameter and color as parameters.
	 */
	var Point = function (x,y,z,diameter, color){
		this.x = x;
		this.y = y;
		this.z = z;
		this.diameter = diameter;
		this.color = color;
	};
	Point.prototype = {
		
		/*
		 * Function to rotate point(recalculate coordinates) around some other 
		 * point in space. It takes 3 angles for each axis(or beter planes as they
		 * are marked acording of the plane we are rotating on) and point to rotate
		 * around.
		 */
		rotate : function (xyAngle,xzAngle,yzAngle,centerPoint){
			if(!this.isSamePosition(centerPoint)){
				console.log("rotating point x,y,z = " + this.x + "," + this.y + "," + this.z);
				console.log("angle xy,xz,yz " + xyAngle/Math.PI + "PI," + 
										xzAngle/Math.PI + "PI," + yzAngle/Math.PI + 
										"PI, around x,y,z = " + centerPoint.x + "," +
										 centerPoint.y + "," + centerPoint.z);
				
				
				
				// 'this' needs to be maped, as it`s meaning changes in the folowing loop,
				// and adding it to the end of forEach function would not be very obvious
				var self = this;
				
				// we loop for each angle so we can rotate in 3 directions in one loop
				[[xyAngle,'x','y'],[xzAngle,'x','z'],[yzAngle,'y','z']]
					.filter(function (item){return item[0] !== 0;})
					.forEach(function(angle){
					
					console.log("rotating in plane " + angle[1] + angle[2] + " by " + angle[0]);
					
					// Calculate coordinates relative to the point, we are going rotate around.
					var relative = {x : self.x - centerPoint.x,
													y : self.y - centerPoint.y,
													z : self.z - centerPoint.z};
						
					// Calculating distance from center.
					var distanceFromCenter = Math.round(
						Math.sqrt(Math.pow(relative[angle[2]],2) +
							Math.pow(relative[angle[1]],2)
						)
					);
					
					if(distanceFromCenter != 0){
						// To correctly compute the angle we need to know into which quadrant
						// are we going to fall.
						var quadrant = relative[angle[1]] >= 0 ? 
							(relative[angle[2]] >= 0? 1 : 2) :
							(relative[angle[2]] >= 0 ? 4 : 3);
	
						var angleFromCenter = Math.asin(Math.abs(relative[angle[1]])/distanceFromCenter);
						
						switch(quadrant){
							case 1: break;
							case 2:	angleFromCenter = Math.PI - angleFromCenter;
									break;
							case 3:	angleFromCenter = Math.PI + angleFromCenter;
									break;
							case 4:	angleFromCenter = Math.PI*2 - angleFromCenter;
									break;
						}
						console.log("angleFromCenter = " + angleFromCenter/Math.PI + "PI");
						
						// Adding angle to x,y,z
						self[angle[1]] = Math.round(
							((Math.sin(angle[0] + angleFromCenter) * distanceFromCenter) + centerPoint[angle[1]])*1000000
						)/1000000;
						self[angle[2]] = Math.round(
							((Math.cos(angle[0] + angleFromCenter) * distanceFromCenter) + centerPoint[angle[2]])*1000000
						)/1000000;
						
						console.log("after rotation x,y,z = " + self.x + "," + self.y + "," + self.z);
					}
				});
			}
		},
		toString : function(){
			return 'x' + this.x + 'y' + this.y + 'z' + this.z; 
		},
		// Returns true if all coordinates are equal.
		isSamePosition : function(otherPoint){
			return this.x === otherPoint.x && this.y === otherPoint.y && this.z === otherPoint.z;
		}
	};
	
	return Point;
	
});
/*
 * Color object. Just to wrap standard rgb(r,g,b) notation.
 */
define('Color',[],function(){
	return function (r,g,b){
		this.rgb = "rgb(" + r + "," + g + "," + b + ")";
	};
});
/*
 * Definition of variables global to pseudo3D module
 */
define('globals',[],function (){
	
	var pointRadius = 5;
	var gridSpacing = 15;
	var contextWidth = 400;
	var contextHeight = 200;
	var contextDistance = 200;
	var z00 = 200;
	var x00 = contextWidth/2;
	var y00 = contextHeight/2;
	
	return{
		// How big will the point appear.
		POINT_RADIUS : pointRadius,
		// Spacing between points on the grid.
		GRID_SPACING : gridSpacing,
		
		// Dimensions of the actual HTML canvas.
		CONTEXT_WIDTH : contextWidth,
		CONTEXT_HEIGHT : contextHeight,
		
		// Should be distance of the canvas for same calculations but 
		// does not work as intended(bigger the number, closer/bigger the object seems to be) 
		CONTEXT_DISTANCE : contextDistance,
		
		// Center of the canvas.
		Z00 : z00,  
		X00 : x00,
		Y00 : y00
	}
});
/*
 * 
 * Definition of grif of points that are going to be displayed on the canvas. Points are stored as points in space (not as points on canvas).
 * Initializing of grid is done from 3 dimensional array of 0 and 1 (1 means there is a point 0 means there isnt).
 * 
 */


define('PointGrid',['console', 'Point', 'globals','Color'],function (console, Point, globals,Color){

	/*
	 * Constructor method which takes a 3 dimensional array.
	 */
	var PointGrid = function (mapGrid){
		this.mapGrid = mapGrid;
		this.points = [];
		
		for(var i = 0,lengthi = mapGrid.length; i < lengthi; i++){ //for Z layers or depth
		  for(var j = 0,lengthj = mapGrid[i].length; j < lengthj; j++){ //for Y lines or height
        for(var k = 0, lengthk = mapGrid[i][j].length; k < lengthk; k++){ //for X columns or width
          
          if(mapGrid[i][j][k] == 1){
          
            // Object defined by the mapGrid array should be in the center of the canvas
            // so we need to calculate right coordinates
            
            var relativeXGrid = k - Math.floor(lengthk/2);
            var relativeYGrid = j - Math.floor(lengthj/2);
            var relativeZGrid = i - Math.floor(lengthi/2);

            var x = (relativeXGrid * globals.GRID_SPACING) + globals.X00;
            var y = (relativeYGrid * globals.GRID_SPACING) + globals.Y00;
            var z = (relativeZGrid * globals.GRID_SPACING) + globals.Z00;
            
            this.points[this.points.length] = new Point(x,y,z,globals.POINT_RADIUS,new Color(0,0,0));
          
          }
        }
		  }
		}
	};
	
	// Rotating of the whole grid/object. Actual position calculation is delegated to the Point object
	PointGrid.prototype = {
		rotate : function(xyAngle,xzAngle,yzAngle,centerPoint){
			
			this.points.forEach(function(point){
					point.rotate(xyAngle,xzAngle,yzAngle,centerPoint)
				});
			
		}
	};
	
	return PointGrid;
});
/*
 * Wrapper object for canvas and some variables controling the look and feel of the display.
 */
define('Context3D',['console','globals','Point', 'PointGrid'],function (console, globals, Point, PointGrid){
	
	/*
	 * Initialization of the wrapper with the canvas element.
	 */
	var Context3D = function (canvas){
		this.canvas = canvas;
		this.context = canvas.getContext("2d");
		
		// This array will hold all objects(only points or pointGrids for now).
		// As pointGrid and point has the same rotate method we will be able to
		// rotate all objects in this array.
		this.model = [];
	};
 
	Context3D.prototype = {
		
		/*
		 * Drawing point on tha canvas. Actual position on the canvas and radius is computed with 
		 * consideration of the Z coordinate of the drawn point. 
		 */
		drawPoint : function(point){
			if(point){
				console.log("Drawing point x = " + point.x + ", y = " + point.y + 
										", z = " + point.z + ", radius = " + point.diameter);
				
				// Pading of the layer. This means the diference between dimensions of the canvas and 
				// dimensions of the suposed canvas with given depth (z coordinate), so that we can 
				// move the point to the center, even after position recalculation.
				var paddingX = (globals.CONTEXT_WIDTH - ((globals.CONTEXT_WIDTH/point.z) * globals.CONTEXT_DISTANCE))/2;
				var paddingY = (globals.CONTEXT_HEIGHT - ((globals.CONTEXT_HEIGHT/point.z) * globals.CONTEXT_DISTANCE))/2;
				
				// Calculating actual position of the point on the canvas according to its depth.
				var posX = ((point.x/point.z) * globals.CONTEXT_DISTANCE) + paddingX;
				var posY = ((point.y/point.z) * globals.CONTEXT_DISTANCE) + paddingY;
				var radius = (point.diameter/point.z) * globals.CONTEXT_DISTANCE;
				
				console.log("Drawing to posX = " + posX + ", posY = " + posY + ", radius = " + radius);
				
				// Draw the point only if the point does not cross borders of the canvas. 
				if(radius > 0 && posX-radius > 0 && posX+radius < globals.CONTEXT_WIDTH && 
					posY-radius > 0 && posY+radius < globals.CONTEXT_HEIGHT ){
					
					this.context.fillStyle = point.rgb;
					this.context.moveTo(posX + radius,posY);
					this.context.arc(posX,posY,radius,0,Math.PI*2,false);
				}
			}
		},
    fill : function(){
      this.context.fill();
    },
    beginPath : function(){
      this.context.beginPath();
    },
    
    /*
     * Drawing each point of the grid separately. It takes grid of points and function which 
     * will be caled after the drawing(that means fill or stroke method)
     */
    drawPointGrid : function (pointGrid){
    	if(pointGrid){
	      pointGrid.points.forEach(function(point){this.drawPoint(point)},this);	
    	}
    },
    clear : function (){
      this.canvas.width = this.canvas.width;
    },
    clearModel : function (){
    	this.clear();
    	this.model = {};
    },
    
    /*
     * Part of the API, draws everything that is in the model to canvas
     */ 
    draw : function(){
    	this.clear();
    	if(this.model.length > 0){
	    	this.beginPath();
	    	// We draw each item to canvas;
	    	this.model.forEach(function (item){
	    		if(item instanceof Point){
	    			this.drawPoint(item);
	    		}else{
	    			this.drawPointGrid(item);
	    		}
	    	}, this);
	    	this.fill();
	    }
    },
    
    /*
     * Add new item to model (only Point or PointGrid)
     */
    addModel : function (item){
    	if(item){
    		// TODO change this or make PointGrid and Point visible outside
    		if(item instanceof Point){
    			this.model.push(item);
    		}else{
    			this.model.push(new PointGrid(item));
    		}
    	}
    },
    
    /*
     * Rotate all objects in the model, and option not to draw them automaticaly.
     */
    rotate : function (options, rotateOnly){
    	this.model.forEach(function (item){
    		item.rotate(options.xy, options.xz, options.yz, options.center);
    	});
    	if(!rotateOnly){
    		this.draw();
    	}
    }
  };
  
  return Context3D;
	
});
/*
 * Definition of public API
 */
define('Pseudo3D',['Context3D','PointGrid','globals'],function(Context3D,PointGrid,globals){

	window.Pseudo3D = window.Pseudo3D || function (canvas){
		if(!canvas){
			return null;
		}
		if(typeof canvas === 'string'){
			canvas = document.getElementById(canvas);
		}
		var c3d = new Context3D(canvas);
		
		// Return only public API
		return {
			draw : function(){
				c3d.draw();
				return this;
			},
			clear : function(){
				c3d.clear();
				return this;
			},
			rotate : function(options, rotateOnly){
				c3d.rotate(options, rotateOnly);
				return this;
			},
			//Specific rotate functions
			rotateXY : function(angle, center){
				c3d.rotate({xy : angle, xz : 0, yz : 0, center : center}, false);
				return this;
			},
			rotateXZ : function(angle, center){
				c3d.rotate({xy : 0, xz : angle, yz : 0, center : center}, false);
				return this;
			},
			rotateYZ : function(angle, center){
				c3d.rotate({xy : 0, xz : 0, yz : angle, center : center}, false);
				return this;
			},
			clearModel : function(){
				c3d.clearModel();
				return this;
			},
			addModel : function(model){
				c3d.addModel(model);
				return this;
			}
		};
		
	};
	return window.Pseudo3D;

});}());