<template>
  <button type="button" class="base-btn" @click="onClick(pieceNo)">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';

export default defineComponent({
  name: 'BaseBtn',
  setup(props, context: SetupContext) {
    const onClick = (): void => {
      context.emit('on-click');
    };

    return { onClick };
  }
});
</script>

<style scoped>
button {
  cursor: pointer;
  outline: none;
  margin: 0;
}
</style>
