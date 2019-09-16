import React from 'react';
import audio1 from '../assets/audio/1.mp3';
import css from './Player.module.css';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlayCircle, faPauseCircle, faPause, faPlay, faVolumeOff, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';


class Player extends React.Component {

	audio = null;

	state = {
		isPlaying : false,
		options : {
			preload : "true",
			volume : 10,
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

	stop = () => {
		this.audio.pause();
		this.audio.currentTime=0;
		this.setState({isPlaying : false});
	}
	
	onPlay = (e) => console.log("ON_PLAY",e.target);
	onPause = (e) => console.log("ON_PAUSE",e.target);
	onVolumeChange	= (e) => console.log("ON_VOLUME_CHANGE",e.target);
	onLoad = (e) => console.log("ON_LOAD",e.target);
	onProgress = (e) => {
		console.log("THIS",this);
		this.setState({audioPlayer:e.target});
	};
	onSeeked =   (e) => console.log("ON_SEEKED",e.target);
	onTimeUpdate = (e) => console.log("ON_TIME_UPDATE",e.target);

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
							<span style={{marginRight : '12px'}}>00:00</span>
							<Slider
								style={{width : '76%'}}
								onBeforeChange={(e)=>log("BeforeChange",e)}	
								onChange={(e)=>log("Change",e)}
								onAfterChange={(e)=>log("AfterChange",e)}
							/>
							<span style={{marginLeft : '6px'}}>00:00</span>
						</div>
					</div>

					<div className={css.volume} style={{flexBasis : '10%'}}>
						<FontAwesomeIcon  icon={faVolumeUp} size="lg"/>
						<Slider 
							style={{width : '60%'}}
							onBeforeChange={(e)=>log("BeforeChange",e)}
							onChange={(e)=>log("Change",e)}
							onAfterChange={(e)=>log("AfterChange",e)}
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