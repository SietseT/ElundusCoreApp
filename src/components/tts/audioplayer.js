import React from "react"
import ReactPlayer from "react-player";

import "./../../styles/soundplayer.css";


class Audioplayer extends React.Component {
    constructor() {
        super();

        this.state = {
            playing: true,
            currentDurationString: "0:00",
            maxDurationStringString: "0:00",
            progressBarWidth: 0,
        };

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.togglePlayClick = this.togglePlayClick.bind(this);

        this.progressBarRef = React.createRef();
        this.progressBarPosition = 0;
        this.duration = 0;
    }

    componentDidUpdate(prevProps) {
        // Reset playing for when a new sound is loaded. 
        if(prevProps.src !== this.props.src) {
            this.player.seekTo(0);

            this.setState({
                playing: true
            });
        }
     }

    onProgress(event) {
        // Calculate width of progressbar in percentage
        let progressBarWidth = event.playedSeconds / event.loadedSeconds * 100;

        // If not playing, this may trigger too many state updates
        if(this.state.playing !== true) {
            return;
        }

        this.loadedSeconds = event.loadedSeconds;

        
        let maxDurationString = this.getTimeCodeFromNum(this.player.getDuration());

        this.setState({
            currentDurationString: this.getTimeCodeFromNum(event.playedSeconds),
            progressBarWidth: progressBarWidth,
            position: progressBarWidth,
            playing: event.playedSeconds != event.loadedSeconds
        });

        if(this.state.maxDurationString != maxDurationString) {
            this.setState({
                maxDurationString: this.getTimeCodeFromNum(this.player.getDuration())
            });
        }
    }

    togglePlayClick() {
        this.setState({
            playing: !this.state.playing
        });
    }

    onMouseClick() {
        // Calculate position to seek to
        let position = this.progressBarPosition / 100;
        this.player.seekTo(position, "fraction");

        if(!this.state.playing) {
            this.setState({
                playing: true
            });
        }
        
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

    ref = player => {
        this.player = player
      }

    render() {
        return (
            <div className="audio-player">                
            <ReactPlayer url={this.props.src} ref={this.ref} playing={this.state.playing} width='100%' height='100%' 
            onProgress={this.onProgress} progressInterval="500"
            />
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
                        <div className="length">{this.state.maxDurationString}</div>
                    </div>                    
                </div>
            </div>

        )
    }
}

export default Audioplayer;
