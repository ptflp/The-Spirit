class Microphone {
    constructor() {
        this.initialized = false;
        this.record = false;
    }
    init() {
        if (!this.initialized) {
            navigator.mediaDevices.getUserMedia({ audio: true})
                .then(function(stream) {
                    this.audioContext = new AudioContext();
                    this.microphone = this.audioContext.createMediaStreamSource(stream);
                    this.analyzer = this.audioContext.createAnalyser();
                    this.analyzer.fftSize = 512;
                    const bufferLength = this.analyzer.frequencyBinCount;
                    this.dataArray = new Uint8Array(bufferLength);
                    this.microphone.connect(this.analyzer);
                    this.initialized = true;
                }.bind(this)).catch(err => {
                    console.log(err);
                })
        }
    }
    stop() {
        this.record = false;
    }
    start() {
        if (!this.initialized) {
            this.init();
        }
        this.record = true;
    }
    getSamples() {
        if (this.initialized) {
            this.analyzer.getByteTimeDomainData(this.dataArray);
            let normSamples = [...this.dataArray].map(x => x / 128 - 1);
            return normSamples;
        }
    }
    getVolume() {
        if (this.initialized) {
            this.analyzer.getByteTimeDomainData(this.dataArray);
            let normSamples = [...this.dataArray].map(x => x / 128 - 1);
            let sum = 0;
            for (let i = 0; i < normSamples.length; i++) {
                sum += normSamples[i] * normSamples[i];
            }
            let volume = Math.sqrt(sum / normSamples.length);
            return volume;
        }
    }
}

module.exports = Microphone;