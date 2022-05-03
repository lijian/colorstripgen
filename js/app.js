
const ImagenApp = {
    data() {
        return {
            isStripOn: false,
            isGridOn: false,
            isHStripOn: false,
            isCenterGrayOn: false,
            defaultScreenSize: {width: 1080, height: 2340},
            deviceScreenSize: {
                //width: window.screen.width * window.devicePixelRatio,             
                //height: window.screen.height * window.devicePixelRatio
                width: 1080,
                height: 2340
            },
            hstripOptions: {
                wrgb: false
            },
            stripImageDataUrl: void 0,
            stripImageDownloadName: void 0,
            gridImageDataUrl: void 0,
            gridImageDownloadName: void 0,
            hStripImageDataUrl: void 0,
            hStripImageDownloadName: void 0,
            centerGrayImageDataUrl : void 0,
            centerGrayImageDownloadName: void 0,
            gridWidth: 1,
            mGrid: '[["#FF00FF","#00FF00"], ["#00FF00","#FF00FF"]]',
            previewWidth: 200,
            previewHeight: 0
        }
    },

    created() {
        //console.log("created")
    },

    computed: {
        stripImageAvailable() {
            return this.stripImageDataUrl ? true : false;
        },
        gridImageAvailable() {
            return this.gridImageDataUrl ? true : false;
        },
        hStripImageAvailable() {
            return this.hStripImageDataUrl ? true : false;
        },
        centerGrayImageAvailable() {
            return this.centerGrayImageDataUrl ? true : false;
        }
    },

    methods: {
        gotoStripGen() {
            this.isStripOn = true;
            this.isGridOn = false;
            this.isHStripOn = false;
            this.isCenterGrayOn = false;
        },

        gotoGridGen() {
            this.isStripOn = false;
            this.isGridOn = true;
            this.isHStripOn = false;
            this.isCenterGrayOn = false;
        },
        gotoHStripGen() {
            this.isGridOn = false;
            this.isStripOn = false;
            this.isHStripOn = true;
            this.isCenterGrayOn = false;
        },
        gotoCenterGrayGen() {
            this.isGridOn = false;
            this.isStripOn = false;
            this.isHStripOn = false;
            this.isCenterGrayOn = true;
        },
        backToHome() {
            this.isStripOn = false;
            this.isGridOn = false;
            this.isHStripOn = false;
            this.isCenterGrayOn = false;
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
            }

            var dataURL = canvas.toDataURL();
            this.stripImageDataUrl = dataURL;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            this.stripImageDownloadName = "stripImage_" + timetail + ".png";
            this.previewWidth = 200;
            this.previewHeight = Math.round(200 * height / width);

        },
        downloadStripImage() {
            //console.log('not done yet');
            if(!this.stripImageDataUrl) {
                return;
            }

            var atag = document.createElement("a");
            atag.href = this.stripImageDataUrl;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            atag.download = "stripImage_" + timetail + ".png";
            atag.click();
        },
        switchWRGBOption() {
            //console.log(this.hstripOptions);
            if(this.hStripImageAvailable) {
                this.previewHStripImage();
            }
        },
        previewHStripImage(){
            var colorList = [ "#FF0000", "#00FF00", "#0000FF"];

            if(this.hstripOptions.wrgb){
                colorList.unshift("#FFFFFF");
            }
            //console.log(colorList);
    	
            function generateHStrip(context, startX, startY, stopX, stopY, startColor, stopColor) {
                var grd = context.createLinearGradient(startX, startY, 0, stopY);
                grd.addColorStop(0, startColor);
                grd.addColorStop(1, stopColor);
                
                context.fillStyle = grd;
                context.fillRect(startX, startY, stopX, stopY);
            }

            var canvas = document.createElement("canvas");
            var width = this.deviceScreenSize.width;
            var height = this.deviceScreenSize.height;
			canvas.width = this.deviceScreenSize.width;
			canvas.height = this.deviceScreenSize.height;
			var context = canvas.getContext("2d");

            //console.log(this.hstripOptions);
			
			var startX, startY, stopX, stopY;
			//var stripWidth = width / colorList.length;
            //var stripWidth = width;
            var stripHeight = Math.round(height / colorList.length);
			//var stripWidth = 80;
			for(var i = 0; i < colorList.length; i++) {
				startX = 0;
				startY = i * stripHeight;
				//stopX = startX + stripWidth;
                stopX = width;
				//stopY = height;
                if(i < colorList.length - 1) {
                    stopY = startY + stripHeight;
                } else {
                    stopY = height;
                }
				generateHStrip(context, startX, startY, stopX, stopY, "#000000", colorList[i]);
				//console.log("startX = " + startX + ", stopX = " + stopX + ", startY = " + startY + ", stopY = " + stopY);
	      	}

            var dataURL = canvas.toDataURL();
            //document.getElementById("image").src = dataURL;
            this.hStripImageDataUrl = dataURL;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            this.hStripImageDownloadName = "hStripImage_" + timetail + ".png";
            this.previewWidth = 200;
            this.previewHeight = Math.round(200 * height / width);
        },
        downloadHStripImage() {
            //console.log('not done yet');
            if(!this.hStripImageDataUrl) {
                return;
            }

            var atag = document.createElement("a");
            atag.href = this.hStripImageDataUrl;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            atag.download = "hStripImage_" + timetail + ".png";
            atag.click();
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
            var gridWidth = this.gridWidth;

            canvas.width = width;
            canvas.height = height;

            var context = canvas.getContext("2d");
            var baseWidth = gridWidth ? gridWidth : 1;
            var offsetX, offsetY;

            //var mGrid = [["#FF00FF","#00FF00"], ["#00FF00","#FF00FF"]]; //TODO
            var mGrid = JSON.parse(this.mGrid);
            //console.log(typeof mGrid)
            
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
            this.gridImageDataUrl = dataURL;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            this.gridImageDownloadName = "gridImage_" + timetail + ".png";
            this.previewWidth = 200;
            this.previewHeight = Math.round(200 * height / width);
        },
        previewCenterGrayImage () {
            console.log("preview center gray image");

            var canvas = document.createElement("canvas");
            var width = this.deviceScreenSize.width;
            var height = this.deviceScreenSize.height;
            //var gridWidth = this.gridWidth;

            canvas.width = width;
            canvas.height = height;

            var context = canvas.getContext("2d");
            var centerX = width / 2;
            var centerY = height / 2;

            context.imageSmoothingEnabled = true;
            context.globalAlpha = 1;

            /*
            var r0 = 0, r1 = Math.sqrt(centerX * centerX + centerY * centerY);
            var gradient = context.createRadialGradient(centerX, centerY, r0, width, 0, r1);
            gradient.addColorStop(0, '#FFFFFF');
            gradient.addColorStop(1, '#000000');
            context.fillStyle = gradient;
            context.fillRect(centerX, 0, width, centerY);
            */

            var grdTop = context.createLinearGradient(centerX, centerY, centerX, 0);
            grdTop.addColorStop(0, '#FFFFFF');
            grdTop.addColorStop(1, '#000000');

            var grdBottom = context.createLinearGradient(centerX, centerY, centerX, height);
            grdBottom.addColorStop(0, '#FFFFFF');
            grdBottom.addColorStop(1, '#000000');

            var grdLeft = context.createLinearGradient(centerX, centerY, 0, centerY);
            grdLeft.addColorStop(0, '#FFFFFF');
            grdLeft.addColorStop(1, '#000000');

            var grdRight = context.createLinearGradient(centerX, centerY, width, centerY);
            grdRight.addColorStop(0, '#FFFFFF');
            grdRight.addColorStop(1, '#000000');

            /*
            var regionTop = new Path2D();
            regionTop.moveTo(0, 0);
            //regionTop.moveTo(-2, 0);
            regionTop.lineTo(width, 0);
            regionTop.lineTo(centerX, centerY);
            regionTop.closePath();
            context.fillStyle = grdTop;
            context.fill(regionTop);
            */
            context.fillStyle = grdTop;
            context.fillRect(0, 0, width, centerY);
            /*
            var regionBottom = new Path2D();
            regionBottom.moveTo(centerX, centerY);
            regionBottom.lineTo(width, height);
            regionBottom.lineTo(0, height);
            regionBottom.closePath();
            context.fillStyle = grdBottom;
            context.fill(regionBottom);
            */
           context.fillStyle = grdBottom;
           context.fillRect(0, centerY, width, height);

            var regionLeft = new Path2D();
            regionLeft.moveTo(0, 0);
            regionLeft.lineTo(centerX, centerY);
            regionLeft.lineTo(0, height);
            regionLeft.closePath();
            context.fillStyle = grdLeft;
            context.fill(regionLeft);

            var regionRight = new Path2D();
            regionRight.moveTo(width, 0);
            regionRight.lineTo(width, height);
            regionRight.lineTo(centerX, centerY);
            regionRight.closePath();
            context.fillStyle = grdRight;
            context.fill(regionRight)



            var dataURL = canvas.toDataURL();
            this.centerGrayImageDataUrl = dataURL;
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            this.centerGrayImageDownloadName = "centerGrayImage_" + timetail + ".png";
            this.previewWidth = 200;
            this.previewHeight = Math.round(200 * height / width);

        },
        downloadGridImage() {
            if(!this.gridImageDataUrl) {
                return;
            }

            var atag = document.createElement("a");
            var timetail = new Date().toLocaleDateString().replaceAll("/", "-");
            atag.href = this.gridImageDataUrl;            
            atag.download = "gridImage_" + timetail + ".png";
            atag.click();
        },
        gotoFullScreen() {
            //console.log("fullscreen")
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }            
        }


    }
};

Vue.createApp(ImagenApp).mount('#app-container')

