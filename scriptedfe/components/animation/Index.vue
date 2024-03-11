<template>
  <div class="relative w-11/12 -mb-2 md:w-1/2 lg:w-1/3 md:mb-0">
    <NuxtLink
      to="/"
      class="absolute top-0 left-0 w-full h-full  nuxt-link-exact-active nuxt-link-active"
    ></NuxtLink>
   
    <div id="logodiv">
      <!-- <img
          class="p-0"
          src="/ALWA.svg"
          width="50%"
          height="50%"
          alt="logo"
        /> -->
        <!-- <SvgHenHouse></SvgHenHouse> -->
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    const { default: P5 } = await import('p5')

    const sketch = (s) => {
      let sketchwidth = 2000
      let sketchheight = sketchwidth / 8
      let r = 180
      let voffset = -sketchheight / 6
      let textscale = 8 //higher is smaller

      let switch1 = true
      let switch2 = true
      let switch3 = true
      let switch4 = true
      let switch5 = true
      let switch6 = true
      let switch7 = true
      let switch8 = true

      let fill1 = 0
      let fill2 = 0
      let fill3 = 0
      let fill4 = 0
      let fill5 = 0
      let fill6 = 0
      let fill7 = 0
      let fill8 = 0

      let rotations = [0, 12, 36, 181, 192, 204, 240, 266]
      let textarray = ['H', 'e', 'n', 'H', 'o', 'u', 's', 'e']

      let circledia = (sketchwidth / 2 - 15) * -1

      s.drawletter = (letter, rotation, index) => {
        let planetoggle = true
        s.push()
        s.rotateY(rotation * -1)
        s.translate(0, 0, circledia)
        s.text(letter, 0, voffset, 0)
        s.pop()
        planetoggle = false
        s.fill(0)
      }

      s.setup = () => {
        let f = s.loadFont('/GT-Walsheim-Condensed-Regular-Trial.woff2')
        let myCanvas = s.createCanvas(sketchwidth, sketchheight, s.WEBGL)
        myCanvas.parent('logodiv')
        s.ortho(
          -sketchwidth / 2,
          sketchwidth / 2,
          -sketchheight / 2,
          sketchheight / 2,
          0,
          1000000000000000000
        )
        s.textFont(f, 400)
        s.textSize(sketchwidth / textscale)

        s.textLeading(0)
      }

      s.draw = () => {
        s.fill(0)
        s.angleMode(s.DEGREES)

        s.camera(400, 0, 0)
        s.smooth()
        s.background(255)
        s.textAlign(s.CENTER, s.CENTER)

        s.rotateY(r)

        for (var i = 0; i < textarray.length; i++) {
          s.drawletter(textarray[i], rotations[i], i)
        }

        r -= 0.18
        if (r == 360) {
          r = 0
        }
      }
    }
    // eslint-disable-next-line no-unused-vars
    const canvas = new P5(sketch, 'p5Canvas')
  },
}
</script>
<style scoped>
canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>