<!-- components/TransitionComponent.vue -->

<template>
    <div class="">
  
        
      <transition name="screen-transition" mode="out-in" >
        <!-- <div v-if="isTransitionActive" class="white-screen"></div> -->
      <div v-if="isTransitionActive" class="black-screen"></div>
      <!-- <div v-if="isTransitionActive" class="bg-white w-screen h-screen absolute z-[100000000]"></div> -->
    </transition>


    <!-- Text content outside the black-screen div text-zinc-700  text-slate-50-->
    <div  v-if="isTransitionActive" :class="{ 'active': isTransitionActive }" class="white-screen"></div>
    <div class="text-content overflow-hidden " :class="{ 'active': isTransitionActive }">
      <div class="flex uppercase w-screen content-center flex-wrap text-[#2a2a2a]  h-screen justify-center p-10">
  
        <!-- <div><h1 class="titleText text-9xl text-center uppercase">Scripted<p class="text-6xl">Casting by Coralie</p></h1></div> -->
        <div><h1 class="titleText text-[12rem] text-center uppercase">Scripted</h1></div>


      </div>
    </div>

    </div>
 
  </template>
  
  <style scoped>

@media (max-width: 768px) {
.copyr{
  width: 60vw;
}

.titleText{
  font-size: 6rem;
}
}
.text-content {
  position: fixed;
  top: 50%; /* Vertically center the text */
  left: 50%; /* Horizontally center the text */
  transform: translate(-50%, -50%) scale(0.8); /* Initial state with reduced scale */
  opacity: 0; /* Initially transparent */
  visibility: hidden; /* Initially hidden */
  color: rgb(248 250 252 / var(--tw-text-opacity));
  color: black;
  z-index: 100003;
  transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Add transform for scaling effect */
}

.text-content.active {
  visibility: visible; /* Show the text when active */
  opacity: 1; /* Fully opaque when active */
  transform: translate(-50%, -50%) scale(1); /* Transition to full scale */
}

  /* Styles for the black screen transition */
  .black-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgb(18, 18, 18); */
  background-color: #ffffff;
  /* background-color: #11ff00; */
    /* -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px); */
  transform: translateY(0); /* Initially hidden, translated down */
  /* transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94); */
  transition: opacity 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 100002;
}

.white-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(255, 255, 255, 0.357);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px); */
  background-color: #fff; 
  z-index: 100001; /* Adjust z-index to be behind the black-screen */
}
.blacksText{
    transition: none !important;
    transform: none !important;
}
/* Transition animation */
.screen-transition-enter-active, .screen-transition-leave-active {
  /* transition: opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94); */
  transition: opacity 3000ms cubic-bezier(0.25, 0.46, 0.45, 0.94);

}

.screen-transition-enter {
  /* transition-delay: .005s; Pause for 1 second before leaving */
  opacity: 0; /* Initially transparent when entering */
}

.screen-transition-leave-to {
  opacity: 0; /* Fade out when leaving */
}

/* Add a delay when leaving */
.screen-transition-leave-to {
  transition-delay: .005s; /* Pause for 1 second before leaving */
}

/* Styles for the text content */

  </style>
  
  <script>
  export default {
    data() {
      return {
        isTransitionActive: false,
      };
    },
    watch: {
      '$route': 'toggleTransition',
    },
    methods: {
        toggleTransition() {
      this.isTransitionActive = true;
      setTimeout(() => {
        this.isTransitionActive = false;
      }, 2000); // Adjust the duration as needed for the total animation time
    },
    },
    created() {
    // Call toggleTransition when the component is created to start the transition
    this.toggleTransition();
  },
  };
  </script>
  