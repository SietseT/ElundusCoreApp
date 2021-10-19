import React from "react"
import Sound from 'react-sound'

import "./../../styles/soundplayer.css";


class Audioplayer extends React.Component {
    constructor() {
        super();

        this.state = {
            playStatus: Sound.status.PLAYING,
            position: 0,
            currentDurationString: "0:00",
            maxDurationStringString: "0:00",
            progressBarWidth: 0,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onPlaying = this.onPlaying.bind(this);
        this.onFinishedPlaying = this.onFinishedPlaying.bind(this);
        this.togglePlayClick = this.togglePlayClick.bind(this);

        this.progressBarRef = React.createRef();
        this.progressBarPosition = 0;
        this.duration = 0;
    }

    componentDidUpdate(prevProps) {
        // Reset playStatus and position for when a new sound is loaded. 
        if(prevProps.src !== this.props.src) {
            this.setState({
                playStatus: Sound.status.PLAYING,
                position: 0
            });
        }
     }

    onPlaying(event) {

        // Calculate width of progressbar in percentage
        let progressBarWidth = event.position / event.duration * 100;

        // If playStatus is not playing, this may trigger too many state updates
        if(this.state.playStatus !== Sound.status.PLAYING) {
            return;
        }
        this.duration = event.duration;

        this.setState({
            currentDurationString: this.getTimeCodeFromNum(event.position),
            maxDurationString: this.getTimeCodeFromNum(event.duration),
            progressBarWidth: progressBarWidth,
            position: event.position
        });
    }

    onFinishedPlaying() {
        this.setState({
            playStatus: Sound.status.STOPPED
        });
    }

    togglePlayClick() {
        let soundState = Sound.status.PLAYING;
        if(this.state.playStatus === Sound.status.PLAYING) {
            this.setState({
                playStatus: Sound.status.PAUSE
            });
            return;
        }

        let position = this.state.position;
        if(position === this.duration){
            this.setState({
                playStatus: soundState,
                position: 0
            });
        }
        else {
            this.setState({
                playStatus: soundState
            });
        }
    }

    onMouseClick() {
        // Calculate position to seek to
        let position = this.duration * (this.progressBarPosition / 100);

        //First update position, then trigger state. Simultaneously doesn't work.
        this.setState({
            position: position
        }, () => {
            this.setState({
                playStatus: Sound.status.PLAYING
            });
        });
    }

    onMouseMove(event) {
        // Needed to calculate position when clicking on seekbar
        this.progressBarPosition = (event.clientX - this.progressBarRef.current.getBoundingClientRect().left) / event.target.offsetWidth * 100;           
    }

    //turn 128 seconds into 2:08
    getTimeCodeFromNum(num) {
        let seconds = Math.round(parseInt(num) / 1000);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
    
        return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    render() {
        return (
            <div className="audio-player">                
            <Sound url={this.props.src} playStatus={this.state.playStatus} playFromPosition={this.state.position} onPlaying={this.onPlaying} onFinishedPlaying={this.onFinishedPlaying}  />
                <div className="timeline" ref={this.progressBarRef} onMouseMove={this.onMouseMove} onClick={this.onMouseClick} >
                    <div className="progress" style={{"width": this.state.progressBarWidth + '%'}}></div>
                </div>
                <div className="controls">
                    <div className="play-container">
                        <div className={`toggle-play ${this.state.playStatus === Sound.status.PLAYING ? "pause" : "play"}`} onClick={this.togglePlayClick} />
                    </div>
                    <div className="time">
                        <div className="current">{this.state.currentDurationString}</div>
                        <div className="divider">/</div>
                        <div className="length">{this.state.maxDurationString}</div>
                    </div>                    
                </div>
            </div>

        )
    }
}

export default Audioplayer;
