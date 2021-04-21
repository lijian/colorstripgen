
const ImagenApp = {
    data() {
        return {
            isStripOn: false,
            isGridOn: false,
            defaultScreenSize: {width: 1080, height: 2340}
            
        }
    },

    created() {
        //console.log("created")
    },

    computed: {
        deviceScreenSize() {
            return {
                width: window.screen.width * window.devicePixelRatio,             
                height: window.screen.height * window.devicePixelRatio
            }
        }
    },

    methods: {

        gotoStripGen() {
            this.isStripOn = true;
            this.isGridOn = false;
            console.log('goto strip');

        },

        gotoGridGen() {
            this.isStripOn = false;
            this.isGridOn = true;
            console.log('goto grid');
        },

        backToHome() {
            this.isStripOn = false;
            this.isGridOn = false;
        },

        values() {
            return "AAA"
        }
    }
};

Vue.createApp(ImagenApp).mount('#app-container')