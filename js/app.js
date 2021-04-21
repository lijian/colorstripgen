
const ImagenApp = {
    data() {
        return {
            isStripOn: false,
            isGridOn: false,
            defaultScreenSize: {width: 1080, height: 2340},
            deviceScreenSize: {
                width: window.screen.width * window.devicePixelRatio,             
                height: window.screen.height * window.devicePixelRatio
            }
        }
    },

    created() {
        //console.log("created")
    },

    computed: {
    },

    methods: {
        gotoStripGen() {
            this.isStripOn = true;
            this.isGridOn = false;
            //console.log('goto strip');
        },

        gotoGridGen() {
            this.isStripOn = false;
            this.isGridOn = true;
            //console.log('goto grid');
        },

        backToHome() {
            this.isStripOn = false;
            this.isGridOn = false;
        },

        previewStripImage() {
            var colorList = ["#FFFFFF", "#FFFF00", "#FF00FF", "#FF0000", "#00FFFF", "#00FF00", "#0000FF", "#FFFFFF" ];

            function generateStrip(context, startX, startY, stopX, stopY, startColor, stopColor) {
                var grd = context.createLinearGradient(startX, 0, startX, stopY);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, stopColor);
                
                context.fillStyle = grd;
                context.fillRect(startX, startY, stopX, stopY);
            }

            var canvas = document.createElement("canvas");
            var width = this.deviceScreenSize.width;
            var height = this.deviceScreenSize.height;
			canvas.width = width;
			canvas.height = height;
			var context = canvas.getContext("2d");
			
			var startX, startY, stopX, stopY;
			var stripWidth = width / colorList.length;
			//var stripWidth = 80;
			for(var i = 0; i < colorList.length; i++) {
				startX = i * stripWidth;
				startY = 0;
				stopX = startX + stripWidth;
				stopY = height;
				generateStrip(context, startX, startY, stopX, stopY, "#000000", colorList[i]);
				//alert("startX = " + startX + ", stopX = " + stopX + ", startY = " + startY + ", stopY = " + stopY);
    	
    			var dataURL = canvas.toDataURL();
	      		document.getElementById("stripImagePreview").src = dataURL;
                console.log(dataURL);
            }

        },
        downloadStripImage() {
            console.log('not done yet');
        },
        previewGridImage(){
            function drawGridLine(context, startX, startY, width, mLineGrid){
                for(var i = 0; i < mLineGrid.length; i++){
                    context.fillStyle = mLineGrid[i];
                    context.fillRect(startX + (i * width), startY, startX + width, startY + width);
                }
            }

            function drawGrid(context, startX, startY, width, mGrid){
				if(mGrid){
					if(typeof mGrid[0] === "string"){
						drawGridLine(context, startX, startY, width, mGrid);
					}else if(typeof mGrid[0] === "object"){
						for(var j = 0; j < mGrid.length; j++){
							drawGridLine(context, startX, startY, width, mGrid[j]);
							startY += width;
						}
					}
				}				
			}

            var canvas = document.createElement("canvas");
            var width = this.deviceScreenSize.width;
            var height = this.deviceScreenSize.height;
            var gridWidth = 1; //TODO

            canvas.width = width;
            canvas.height = height;

            var context = canvas.getContext("2d");
            var baseWidth = gridWidth ? gridWidth : 1;
            var offsetX, offsetY;

            var mGrid = [["#FF00FF","#00FF00"], ["#00FF00","#FF00FF"]]; //TODO
            
            if(mGrid){
                if(typeof mGrid[0] === 'string'){
                    offsetX = mGrid.length * baseWidth;
                    offsetY = 1 * baseWidth;
                }else if(typeof mGrid[0] === 'object'){
                    offsetX = mGrid[0].length * baseWidth;
                    offsetY = mGrid.length * baseWidth;
                }
            }else{
                alert("meta grid is not set");
            }

            var bufferCanvas = document.createElement("canvas");
            var bufferWidth = width;
            var bufferHeight = offsetY;
            bufferCanvas.width = bufferWidth
            bufferCanvas.height = bufferHeight;
            var bufferContext = bufferCanvas.getContext("2d");
            
            for (var bw = 0; bw < width; bw += offsetX) {
                drawGrid(bufferContext, bw, 0, baseWidth, mGrid);
            }

            for (var h = 0; h < height; h += offsetY) {
                context.drawImage(bufferCanvas, 0, h);
            }

            var dataURL = canvas.toDataURL();
	      	document.getElementById("gridImagePreview").src = dataURL;
            console.log(dataURL);

        }

    }
};

Vue.createApp(ImagenApp).mount('#app-container')