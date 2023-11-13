var settings = require('../core/settings');

// subscription key and region for speech services.
var SpeechSDK;
var synthesizer;

if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;

    // in case we have a function for getting an authorization token, call it.
    if (typeof RequestAuthorizationToken === "function") {
        RequestAuthorizationToken();
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function Say(text) {
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription('2723ecee3597484c962a74c70cf280dc', 'eastus');
    speechConfig.speechSynthesisVoiceName = "en-US-JennyMultilingualV2Neural";
    // Создание PushAudioOutputStream с пользовательским обратным вызовом
    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
        text,
        function (result) {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                let intervalId = setInterval(function () {
                    settings.speed = getRandomArbitrary(0.5, 2.5);
                }, 500);

                // Функция для остановки интервала
                function stopInterval() {
                    clearInterval(intervalId);
                    settings.speed = 0.1;
                    console.log("Интервал остановлен");
                }

                // Пример использования: остановка интервала через 5 секунд
                const timeout = result.privAudioDuration/10000;
                console.log(timeout)
                setTimeout(function() {stopInterval()}, timeout);
                console.log(result);
            } else if (result.reason === SpeechSDK.ResultReason.Canceled) {
                console.log("canceled")
                console.log(result);
            }
            window.console.log(result);
            synthesizer.close();
            synthesizer = undefined;
        },
        function (err) {
            window.console.log(err);
            synthesizer.close();
            synthesizer = undefined;
        });
}

module.exports = Say;

