<template>
  <div>
    <teleport to="#teleport-target">
      <div v-show="isOpen" class="base-modal">
        <slot />
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'BaseModal',
  props: {
    isOpen: Boolean as PropType<boolean>
  }
});
</script>

<style scoped>
.base-modal {
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  height: 200px;
  width: 300px;
  margin: 0 auto;
  padding: 0;
  z-index: 2;
}
</style>
