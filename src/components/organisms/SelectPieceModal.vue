<template>
  <div>
    <start-btn @start-click="stateChange" />
    <base-modal :is-open="state.isOpen">
      <div class="select-piece-modal">
        <p>どちらにしますか？</p>
        <div class="select-piece-modal__btns">
          <cell-btn :piece-no="-1" :piece-mark="`○`" @cell-click="modalClick(`○`)" />
          <cell-btn :piece-no="-1" :piece-mark="`×`" @cell-click="modalClick(`×`)" />
        </div>
      </div>
    </base-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive } from 'vue';
import { PieceType } from '@/types/types.d.ts';
import BaseModal from '../atoms/BaseModal.vue';
import StartBtn from '../molecules/StartBtn.vue';
import CellBtn from '../molecules/CellBtn.vue';

type SelectPieceModalType = {
  isOpen: boolean;
  userPiece: PieceType;
};

export default defineComponent({
  name: 'SelectPieceModal',
  components: {
    'base-modal': BaseModal,
    'start-btn': StartBtn,
    'cell-btn': CellBtn
  },
  setup(props, context: SetupContext) {
    const state = reactive<SelectPieceModalType>({
      isOpen: false,
      userPiece: ''
    });

    const stateChange = (): void => {
      state.isOpen = !state.isOpen;
    };

    const modalClick = (v: PieceType): void => {
      stateChange();
      context.emit('modal-click', v);
    };

    return { state, stateChange, modalClick };
  }
});
</script>

<style scoped>
.select-piece-modal {
  margin: 0 auto;
  padding: 0;
  background-color: #fefefe;
  border: 2px solid black;
}

.select-piece-modal__btns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 50px auto;
  padding: 0;
}
</style>
