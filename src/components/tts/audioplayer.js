import React from "react"

import "./../../styles/soundplayer.css";


class Audioplayer extends React.Component {
    constructor() {
        super();

        this.state = {
            playing: false,
            currentDurationString: "-:--",
            durationStringString: "-:--",
            progressBarWidth: 0,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.togglePlayClick = this.togglePlayClick.bind(this);

        this.progressBarRef = React.createRef();
        this.progressBarPosition = 0;
        this.duration = 0;
        this.audio = new Audio();
    }

    

    componentDidUpdate(prevProps) {
        // Reset playing for when a new sound is loaded. 
        if(prevProps.src !== this.props.src) {

            this.audio.src = this.props.src; 
            this.audio.position = 0;
            this.audio.play();

            this.setState({
                playing: true
            });
        }
     }

     componentDidMount() {
        this.audio.addEventListener('playing', () => this.setState({ playing: true }));
        this.audio.addEventListener('ended', () => this.setState({ playing: false }));        
        this.audio.addEventListener('timeupdate', event => this.onProgress(event));
        this.audio.addEventListener('loadedmetadata', () => this.setDuration());
     }

     setDuration() {        
        let durationString = this.getTimeCodeFromNum(this.audio.duration);
        if(this.state.durationString != durationString) {
            this.setState({
                durationString: durationString
            });
        }
     }

    onProgress() {
        // Calculate width of progressbar in percentage
        let progressBarWidth = this.audio.currentTime / this.audio.duration * 100;

        // If not playing, this may trigger too many state updates
        if(this.state.playing !== true) {
            return;
        }

        this.setState({
            currentDurationString: this.getTimeCodeFromNum(this.audio.currentTime),
            progressBarWidth: progressBarWidth,
            position: progressBarWidth,
            playing: this.audio.currentTime != this.audio.duration
        });

        
    }

    togglePlayClick() {
        if(!this.state.playing) {
            this.play();
        }
        else {
            this.pause();
        }
    }

    play() {
        this.setState({
            playing: true
        });
        this.audio.play();
    }

    pause() {
        this.setState({
            playing: false
        });
        this.audio.pause();
    }

    onMouseClick() {
        // Calculate position to seek to
        let position = this.progressBarPosition / 100;
        console.log('Position: ' + position);
        console.log('currentTime: ' + Math.round(this.audio.duration * position));

        this.audio.currentTime = Math.round(this.audio.duration * position);    
    }

    onMouseMove(event) {
        // Needed to calculate position when clicking on seekbar
        this.progressBarPosition = (event.clientX - this.progressBarRef.current.getBoundingClientRect().left) / event.target.offsetWidth * 100;
    }

    //turn 128 seconds into 2:08
    getTimeCodeFromNum(num) {
        let seconds = Math.round(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
    
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    render() {

        return (
            <div className="audio-player">
                <div className="timeline" ref={this.progressBarRef} onMouseMove={this.onMouseMove} onClick={this.onMouseClick} >
                    <div className="progress" style={{"width": this.state.progressBarWidth + '%'}}></div>
                </div>
                <div className="controls">
                    <div className="play-container">
                        <div className={`toggle-play ${this.state.playing === true ? "pause" : "play"}`} onClick={this.togglePlayClick} />
                    </div>
                    <div className="time">
                        <div className="current">{this.state.currentDurationString}</div>
                        <div className="divider">/</div>
                        <div className="length">{this.state.durationString}</div>
                    </div>                    
                </div>
            </div>

        )
    }
}

export default Audioplayer;
