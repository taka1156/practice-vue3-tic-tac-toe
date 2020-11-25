<template>
  <div>
    <select-piece-modal @modal-click="init" />
    <div class="msg-box">
      <p class="game-msg" v-show="state.msg !== ''">{{ state.msg }}</p>
    </div>
    <div v-if="state.pieces.length !== 0" class="game-frame">
      <div v-for="(piece, index) in state.pieces" :key="`cell_${index}`">
        <cell-btn
          :game-status="state.gameStatus"
          :piece-no="index"
          :piece-mark="piece"
          @cell-click="writePlayer"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {
  PieceType,
  PiecesType,
  GameStatusType,
  PlayerType,
  PlayerInfoType
} from '@/types/types';
import CellBtn from '../molecules/CellBtn.vue';
import SelectPieceModal from '../organisms/SelectPieceModal.vue';

type FieldType = {
  pieces: PiecesType;
  user: PlayerInfoType;
  com: PlayerInfoType;
  gameStatus: GameStatusType | '';
  msg: string;
};

export default defineComponent({
  name: 'GameFrame',
  components: {
    'select-piece-modal': SelectPieceModal,
    'cell-btn': CellBtn
  },
  setup() {
    const state = reactive<FieldType>({
      pieces: [],
      user: { player: 'USER', piece: '' },
      com: { player: 'COM', piece: '' },
      gameStatus: '',
      msg: ''
    });

    const Setting = (userSeletct: PieceType) => {
      state.user.piece = userSeletct;
      state.com.piece = userSeletct === '○' ? '×' : '○';
    };

    const init = (userSelect: PieceType): void => {
      Setting(userSelect);
      state.gameStatus = 'INIT';
      state.msg = '';
      state.pieces = new Array(9).fill('');
    };

    const judgeGameStatus = (piece: PieceType): GameStatusType => {
      const FILEDS: string[] = state.pieces;
      if (FILEDS[0] === piece && FILEDS[1] === piece && FILEDS[2] === piece) {
        return 'WIN';
      } else if (FILEDS[3] === piece && FILEDS[4] === piece && FILEDS[5] === piece) {
        return 'WIN';
      } else if (FILEDS[6] === piece && FILEDS[7] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[0] === piece && FILEDS[3] === piece && FILEDS[6] === piece) {
        return 'WIN';
      } else if (FILEDS[1] === piece && FILEDS[4] === piece && FILEDS[7] === piece) {
        return 'WIN';
      } else if (FILEDS[2] === piece && FILEDS[5] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[0] === piece && FILEDS[4] === piece && FILEDS[8] === piece) {
        return 'WIN';
      } else if (FILEDS[2] === piece && FILEDS[4] === piece && FILEDS[6] === piece) {
        return 'WIN';
      } else if (FILEDS.every(v => v !== '')) {
        return 'DRAW';
      } else {
        return 'CONTINUE';
      }
    };

    const generateMsg = (result: GameStatusType, player: PlayerType): void => {
      if (result === 'CONTINUE') {
        state.gameStatus = 'CONTINUE';
      } else if (result === 'DRAW') {
        state.gameStatus = 'DRAW';
        state.msg = 'DRAW';
      } else {
        state.gameStatus = 'WIN';
        state.msg = `${player} WIN`;
      }
    };

    const writePiece = (
      index: number,
      player: PlayerType,
      piece: PieceType
    ): void => {
      state.pieces[index] = piece;
      const RESULT = judgeGameStatus(piece);
      generateMsg(RESULT, player);
    };

    const rand = (): number => {
      // すでに勝敗が決まっていたら行わない
      if (state.gameStatus === 'WIN' || state.gameStatus === 'DRAW') return -1;
      // 'n' => 未入力の要素の添字のみに絞り込む (あとでミニマックスに変えるかも)
      const FILEDS_INDEX: number[] = [...state.pieces].reduce(
        (arr: number[], v, i) => {
          if (v === '') {
            arr.push(i);
          }
          return arr;
        },
        []
      );

      // ランダムに値を返す
      return FILEDS_INDEX[Math.floor(Math.random() * FILEDS_INDEX.length)];
    };

    const writeCom = (): void => {
      const comWriteIndex = rand();
      const com = state.com;
      if (comWriteIndex !== -1) {
        writePiece(comWriteIndex, com.player, com.piece);
      }
    };

    const writePlayer = (index: number): void => {
      const user = state.user;
      writePiece(index, user.player, user.piece);
      writeCom();
    };

    return { state, init, writePlayer };
  }
});
</script>

<style scoped>
.msg-box {
  display: block;
  margin: 5px auto;
  padding: 0;
  height: 20px;
  width: 80px;
}

.game-msg {
  margin: 0;
  padding: 0;
  color: black;
}

.game-frame {
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
  padding: 0;
  height: 150px;
  width: 150px;
  border: 2px solid black;
}
</style>
