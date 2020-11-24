<template>
  <div>
    <base-btn @on-click="startClick()">
      Start
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import BaseBtn from '../atoms/BaseBtn.vue';

export default defineComponent({
  name: 'BaseBtn',
  components: {
    'base-btn': BaseBtn
  },
  setup(context: SetupContext) {
    const startClick = (): void => {
      context.emit('start-click');
    };

    return { startClick };
  }
});
</script>

<style scoped>
::v-deep() .base-btn {
  display: block;
  height: 80px;
  width: 150px;
  padding: 10px;
  border: 1px solid black;
  font-size: 30px;
}
</style>
