type PieceType = '○' | '×' | 'n';

type PiecesType = PieceType[];

type GameStatusType = 'INIT' | 'CONTINUE' | 'WIN' | 'DROW';

type PlyerType = 'USER' | 'COM';

export { GameStatusType, PlyerType, PieceType, PiecesType };
