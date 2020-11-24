<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <game-flame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameFlame from '@/components/organisms/GameFlame.vue';

export default defineComponent({
  name: 'Home',
  components: {
    'game-flame': GameFlame
  }
});
</script>
