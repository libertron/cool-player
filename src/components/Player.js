import React from 'react';
import audio1 from '../assets/audio/3.mp3';
import audio2 from '../assets/audio/3.mp3';
import formatTime from './utils';
import css from './Player.module.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlayCircle, faPauseCircle, faPause, faPlay, faVolumeOff, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import browser from 'browser-detect';

const result = browser();
console.log(result);

class Player extends React.Component {

	audio = null;

	state = {
		isPlaying : false,
		listened : 0,
		progresspercent : 0,
		duration : 0,
		options : {
			preload : "true",
			volume : 50,
			playindex : 0,
			controls	: false,
		},
		prev : () => console.log("prev"),
		next : () => console.log("next"),
	}

	tooglePlay = () =>{
		this.setState(prevState=>{
			prevState.isPlaying=!prevState.isPlaying;
			if(prevState.isPlaying){
				this.audio.play();
				this.audio.muted=false;
			}else
				this.audio.pause();
			return {
				...prevState,
			}
		})

		// setTimeout( () => this.audio.src = {audio2},6000);
	}

	setTime = value => {
		const time = (this.audio.duration * value) / 100;
		this.setState(prevState =>{
			this.audio.currentTime = time;			
			prevState.options.progresspercent = time;
			return {
				...prevState,
			}
		});
	}

	setVolume = value => {
		this.setState(prevState =>{
			this.audio.volume=value/100;
			prevState.options.volume = value;
			return {
				...prevState,
			}
		});
	}


	oncanplay = e => {}

	onPlay = e =>{
		this.setState({isPlaying : true})
	}


	stop = () => {
		this.audio.pause();
		this.audio.currentTime=0;
		this.setState({isPlaying : false});
	}

	// onPause = (e) => console.log("ON_PAUSE",e.target);

	onloadedmetadata = e => {
		const duration = this.audio.duration;
		const time = this.audio.currentTime;
		this.setState({
			duration : formatTime(duration),
			listened : formatTime(time),
		});
		this.audio.volume = this.state.options.volume/100;

		if (this.props.autoplay){
			switch (result && result.name) {
				case 'chrome':
					break;
				case 'firefox':
					// navigator.mediaDevices.enumerateDevices(
					// 	res => console.log(e),
					// 	res => console.log(e)
					// );
					console.log(navigator);
					
					this.audio.muted=true;
				  break;
				case 'edge':
				  console.log('kinda ok');
				  break;  
				default:
				  console.log('unsupported');
			  }
			let context = new AudioContext();
			context.resume().then( () => {
				this.audio.click();
				const promise = this.audio.play();
				if (promise !== undefined)
					promise.then(()=>console.log('Promise_then')).catch(()=>console.log('Promise_catch'))
				
			})
			// this.tooglePlay();
		}
	}

	onTimeUpdate = e => {
		const duration = this.audio.duration.toFixed(0);
		const time = this.audio.currentTime.toFixed(0);
		const percent = Math.ceil((time / duration) * 100);

		this.setState({
			duration : formatTime(duration),
			listened : formatTime(time),
			progresspercent : percent
		})

		if (this.audio.ended)
			this.setState({isPlaying : false});
	}

	render(){
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
								onChange={(e)=>this.setTime(e)}
								value={this.state.progresspercent}
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
					onCanPlay = {(e) => this.oncanplay(e) }
					onTimeUpdate={(e) => this.onTimeUpdate(e) }
					onLoadedMetadata={(e) => this.onloadedmetadata(e) }
					onPlay = {(e) =>this.onPlay(e)}
				/>
			</div>
		);
	}
}

export default Player;