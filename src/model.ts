
import { config1, config2, config3 } from './puzzle'

export class Coordinate {
    readonly row : number
    readonly column : number

    constructor(row:number, column:number) {
      this.row = row
      this.column = column
    }
}

export class Square {
    location : Coordinate
    letters : string

    constructor(location:Coordinate, letters:string) {
        this.location = location
        this.letters = letters 
    }
}

export class Board {
    squares : Square[][]
    selectedSquare : Coordinate | undefined

    constructor() {
        this.squares = []
        for (let r:number = 0; r < 5; r++) {
            this.squares[r] = []
            for (let c:number = 0; c < 5; c++) {
                let coord = new Coordinate(r, c)
                this.squares[r][c] = new Square(coord, '')
            }
        }

        this.selectedSquare = undefined
    }
}

export class Model {
    words : string[]
    board : Board
    readonly configs = [ config1, config2, config3]
    chosen : number

    /** which is zero-based. */
    constructor(which:number) {
        this.chosen = which
        let puzzle =  this.configs[this.chosen]
        let board = new Board()
        this.words = []
        for (let r:number = 0; r < 5; r++) {
            this.words[r] = puzzle.words[r]

            for (let c:number = 0; c < 5; c++) {
                board.squares[r][c].letters = puzzle.initial[r][c]
            }
        }
        this.board = board
    }

    getConfig() {
        return this.chosen
    }
    contents(row:number, column:number) {
        return this.board.squares[row][column].letters
    }

    setcontents(row:number, column:number, newstring:string) {
        this.board.squares[row][column].letters = newstring
    }

}