<template>
  <div class="cell-btn">
    <base-btn @btn-click="startClick">
      Start
    </base-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue';
import BaseBtn from '../atoms/BaseBtn.vue';

export default defineComponent({
  name: 'StartBtn',
  components: {
    'base-btn': BaseBtn
  },
  setup(props, context: SetupContext) {
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
  margin: 0 auto;
  height: 50px;
  width: 150px;
  padding: 10px;
  border: 1px solid black;
  font-size: 30px;
}

.start-btn {
  height: 50px;
  width: 50px;
}
</style>
