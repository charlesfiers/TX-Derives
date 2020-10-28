import React from 'react'
import Sound from 'react-native-sound';

class Sounds extends React.Component{
  constructor(props) {
    super(props)
    this.sound1 = new Sound('../Musics/Komiku_-_43_-_Travel_to_the_Horizon.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error)
        return
      }
    })
  }

  _startMusic(){
    this.sound1.release()
  }

  _startMusic(time){
    this.sound1.setCurrentTime(time)
    this.sound1.release()
  }
}
