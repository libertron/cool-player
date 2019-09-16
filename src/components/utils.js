
export default  time => {
    let hours = Math.floor(time / 3600);
    let mins = Math.floor((time % 3600) / 60);
    let secs = Math.floor(time % 60);
    
    if ( secs < 10 )
        secs = "0" + secs;
    if ( hours ) {
        if ( mins < 10 )
            mins = "0" + mins;
        return hours + ":" + mins + ":" + secs;    
    }else{
        return mins + ":" + secs;
    }
}