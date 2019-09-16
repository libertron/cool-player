import React from 'react';
import audio1 from '../assets/audio/1.mp3';
import formatTime from './utils';
import css from './Player.module.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlayCircle, faPauseCircle, faPause, faPlay, faVolumeOff, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';


class Player extends React.Component {

	audio = null;

	state = {
		isPlaying : false,
		listened : 0,
		progressPercent : 0,
		duration : 0,
		options : {
			preload : "true",
			volume : 50,
			playindex : 0,
			controls	: true,
			autoPlay	: false,
		},
		prev : () => console.log("prev"),
		next : () => console.log("next"),
		audioPlayer : null,	
	}

	tooglePlay = () =>{
		this.setState(prevState=>{
			prevState.isPlaying=!prevState.isPlaying;
			prevState.isPlaying ? this.audio.play() : this.audio.pause();
			return {
				...prevState,
			}
		})
	}

	setTime = (value) => {
		const time = (this.state.duration * value) / 100;
		this.audio.currentTime = time;
	}

	setVolume = (value) => {
		this.setState(prevState =>{
			this.audio.volume=value/100;
			prevState.options.volume = value;
			return {
				...prevState,
			}
		});
	};

	onVolumeChange	= (e) => {
		console.log("VOLUME",this.audio.volume);
		console.log("State",this.state);
		
	}


	stop = () => {
		this.audio.pause();
		this.audio.currentTime=0;
		this.setState({isPlaying : false});
	}

	// onPlay = (e) => console.log("ON_PLAY",e.target);
	// onPause = (e) => console.log("ON_PAUSE",e.target);
	// onLoad = (e) => console.log("ON_LOAD",e.target);
	// onSeeked =   (e) => console.log("ON_SEEKED",e.target);

	onProgress = (e) => {
		const duration = this.audio.duration.toFixed(0);
		const time = this.audio.currentTime.toFixed(0);
		this.setState({
			duration : formatTime(duration),
			listened : formatTime(time),
		});
	};

	onTimeUpdate = (e) => {
		const duration = this.audio.duration.toFixed(0);
		const time = this.audio.currentTime.toFixed(0);
		const percent = Math.ceil((time / duration) * 100);

		this.setState({
			duration : formatTime(duration),
			listened : formatTime(time),
			progressPercent : percent
		})

		if (this.audio.ended)
			this.setState({isPlaying : false});

		console.log("TIME",time);
		console.log("DURATION",formatTime(duration));
		console.log("PERCENT",percent);
		
	}

	render(){
		const log = (e,type) => console.log(type,e);
		const playImg = this.state.isPlaying ? faPauseCircle : faPlayCircle;
		
		return (
			<div>
				{/* ============PLAYER UI============ */}
				<div className={css.Player} style={{height : '10vh'}}>

					<div className={css.logo} style={{flexBasis : '8%'}}>Logo</div>

					<div className={css.data} style={{flexBasis : '20%'}}>
						<div>
							<span>Title </span>
							<span>like & share</span>	
						</div>
						<div>
							Author
						</div>
					</div>

					<div className={css.progressbar} style={{flexBasis: '52%'}}>
						<div>
							<FontAwesomeIcon  icon={faPlay} rotation={180} size="sm" onClick = { this.state.prev } />
							<FontAwesomeIcon  icon={playImg} size="2x" onClick = { this.tooglePlay }/>
							<FontAwesomeIcon  icon={faPlay} size="sm" onClick = { this.state.next }/>
						</div>
						<div>
							<span style={{marginRight : '12px'}}>{this.state.listened}</span>
							<Slider
								style={{width : '76%'}}
								onChange={(e)=>log("Change",e)}
								value={this.state.progressPercent}
							/>
							<span style={{marginLeft : '6px'}}>{this.state.duration}</span>
						</div>
					</div>

					<div className={css.volume} style={{flexBasis : '10%'}}>
						<FontAwesomeIcon  icon={faVolumeUp} size="lg"/>
						<Slider
							value = {this.state.options.volume}
							style={{width : '60%'}}
							onChange={(e)=>this.setVolume(e)}
						/>
					</div>
				</div>
				{/* ============HIDDEN AUDIO PLAYER============ */}
				<audio 
					ref={node => this.audio = node} 
					src={audio1} 
					{ ...this.state.options }
					onPlay={(e) => this.onPlay(e) }
					onPause={(e) => this.onPause(e) }
					onVolumeChange={(e) => this.onVolumeChange(e) }
					onLoad={(e) => this.onLoad(e) }
					onProgress={(e) => this.onProgress(e) }
					onSeeked={(e) => this.onSeeked(e) }
					onTimeUpdate={(e) => this.onTimeUpdate(e) }
				/>
				{console.log("AUDIO",this.audio)}
			</div>
		);
	}
}

export default Player;