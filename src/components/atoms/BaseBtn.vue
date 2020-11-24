<template>
  <button type="button" class="base-btn" @click="onClick(pieceNo)">
    <v-slot name="btn-label" />
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

.base-btn {
  display: block;
  height: 50px;
  width: 50px;
  padding: 10px;
  border: 1px solid black;
  font-size: 30px;
}
</style>
