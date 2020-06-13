<template>
  <v-content>
    <div >
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </v-content>
</template>


<script>
export default {
    
}
</script>