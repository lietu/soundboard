/* global document, console */
(function () {
    /*
     * Configuration for sounds to include in the soundboard
     *
     * Put files in www/sounds/*.mp3 and list the filenames (without path) here.
     */
    var sounds = [
        "sound-1.mp3",
        "sound-2.mp3",
        "sound-3.mp3",
        "sound-4.mp3",
        "sound-5.mp3",
        "sound-6.mp3",
        "sound-7.mp3",
        "sound-8.mp3",
        "sound-9.mp3",
        "sound-10.mp3",
        "sound-11.mp3",
        "sound-12.mp3",
        "sound-13.mp3",
        "sound-14.mp3",
        "sound-15.mp3",
        "sound-16.mp3",
        "sound-17.mp3",
        "sound-18.mp3",
        "sound-19.mp3",
        "sound-20.mp3"
    ];

    var SoundBoard = {
        sounds: [],
        _container: undefined,
        start: function () {
            console.log("SoundBoard.start()");
            this._container = document.getElementById("container");
            this._initializeSoundStatus();
            this._render();
            this._startPreload();
        },
        _initializeSoundStatus: function () {
            console.log("SoundBoard._initializeSoundStatus()");
            for (var i = 0, count = sounds.length; i < count; i += 1) {
                var filename = sounds[i];
                var name = filename.substring(0, filename.lastIndexOf("."));

                this.sounds.push({
                    name: name,
                    filename: filename,
                    loaded: false,
                    play: this._getPlayFunction(filename)
                });
            }
        },
        _getPlayFunction: function (filename) {
            console.log("SoundBoard._getPlayFunction(" + filename + ")");
            return function () {
                var audio = document.createElement("AUDIO");
                audio.src = 'sounds/' + filename;
                audio.play();
            }
        },
        _getOnloadFunction: function (sound) {
            console.log("SoundBoard._getOnloadFunction(" + sound.filename + ")");
            return function () {
                console.log("Sound " + sound.filename + " preloaded.");
                sound.loaded = true;
            };
        },
        _render: function () {
            console.log("SoundBoard._render()");
            rivets.bind(this._container, this);
        },
        _startPreload: function () {
            for (var i = 0, count = this.sounds.length; i < count; i += 1) {
                var sound = this.sounds[i];
                var audio = document.createElement("AUDIO");
                audio.addEventListener(
                    "loadeddata",
                    this._getOnloadFunction(sound)
                );
                audio.src = 'sounds/' + sound.filename;
            }
        }
    };

    SoundBoard.start();
})();