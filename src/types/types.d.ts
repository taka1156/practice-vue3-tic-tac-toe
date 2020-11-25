type PieceType = '○' | '×' | 'n';

type PiecesType = PieceType[];

type GameStatusType = 'INIT' | 'CONTINUE' | 'WIN' | 'DROW';

type PlayerType = 'USER' | 'COM';

export { GameStatusType, PlayerType, PieceType, PiecesType };
