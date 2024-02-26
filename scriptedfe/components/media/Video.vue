<!-- :src="`https://stream.mux.com/${this.id}-low.m3u8`"   :poster="`https://image.mux.com/${this.id}/thumbnail.jpg?`" 
    :poster="`https://image.mux.com/${this.id}/thumbnail.jpg?time=15`"-->
<template>
  <video 
    ref="video"
    @mouseenter="play"
    @mouseleave="pause"
    loop
    playsinline
    :autoplay="mobile"
    :src="`https://stream.mux.com/${this.id}.m3u8?max_resolution=720p`"
  ></video>

</template>
<script>
import Hls from 'hls.js'
// import { BlurHash } from '@mux/blurhash';


export default {
  props: {
    id: { type: String },
    autoplay: { type: Boolean, default: false },
    // thumbnailTime: { type: Number, default: 0 },
    // blurhash: '',
    // startTime: { type: Number, default: 0 },
  },
  
  data() {
    return {
      intersectionOptions: {
        root: null,
        rootMargin: '0px 0px 0px 0px',
        threshold: [0, 0],
      },
      playing: false,
      aspectRatio: '',
      mobile: false,
      loaded: false,
    }
  },
  methods: {
    play() {
      if (!this.autoplay) {
        let video = this.$refs['video']
        // Set the start time (in seconds)
        // video.currentTime = this.thumbnailTime; 
        video.play()
      }
    },
    pause() {
      if (!this.autoplay) {
        let video = this.$refs['video']
        video.pause()
      }
    },
  },

  watch: {
    autoplay: function (newVal, oldVal) {
      if (newVal) {
        let video = this.$refs['video']
        video.play()
      } else {
        let video = this.$refs['video']
        video.pause()
      }
    },
  },
  mounted() {
    if (window.outerWidth < 768) {
      this.mobile = true
    }
    const playback = 'https://stream.mux.com/' + this.id + '.m3u8'
    let video = this.$refs['video']
    let that = this
    if (Hls.isSupported()) {
      let hls = new Hls()
      hls.loadSource(playback)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        that.loaded = true
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = playback
      that.loaded = true
    }
  },
}
</script>
