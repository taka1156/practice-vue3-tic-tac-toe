<template>
  <button type="button" class="base-btn" @click="btnClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  name: 'BaseBtn',
  setup(props, context: SetupContext) {
    const btnClick = (): void => {
      context.emit('btn-click');
    };

    return { btnClick };
  }
});
</script>

<style scoped>
button {
  cursor: pointer;
  outline: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
}
</style>
