//===================================================== Joystick
class RecordButton{
    constructor(options){
        const circle = document.createElement("div");
        circle.style.cssText = "position:absolute; bottom:35px; width:80px; height:80px; background:rgba(126, 126, 126, 0.5); border:#444 solid medium; border-radius:50%; left:50%; transform:translateX(-50%);";
        const thumb = document.createElement("div");
        thumb.style.cssText = "position: absolute; left: 20px; top: 20px; width: 40px; height: 40px; border-radius: 50%; background: rgb(191 45 45);";
        circle.appendChild(thumb);
        document.body.appendChild(circle);
        this.mic = options.mic;
        this.domElement = thumb;
        this.btn = circle;
        this.origin = { left:this.domElement.offsetLeft, top:this.domElement.offsetTop };
        const recordButton = this;
        if ('ontouchstart' in window){
            this.btn.addEventListener('touchstart', function(evt){ recordButton.tap(evt); });
        }else{
            this.btn.addEventListener('mousedown', function(evt){ recordButton.tap(evt); });
        }
        
    }

    tap(evt){
        evt = evt || window.event;
        console.log('button tapped');
        this.mic.start();
        let btn = this;
        this.domElement.style.borderRadius = '0%';
        window.settings.bgColor = '#7b3193';
        window.settings.attraction = -0.8;
        setTimeout(function(){
            btn.mic.stop();
            btn.domElement.style.borderRadius = '50%';
            if (window.player) {
                window.player.pause();
                window.player.close();
            }
            window.settings.speed = 0.1;
            window.settings.bgColor = '#5bbd5d';
            window.settings.attraction = 1;
        }, 6000);
    }
}//end joystick class

module.exports = RecordButton;