<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <game-frame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameFrame from '@/components/organisms/GameFrame.vue';

export default defineComponent({
  name: 'Home',
  components: {
    'game-frame': GameFrame
  }
});
</script>
