import { expect, test } from 'vitest'
import { Model } from './model'
// expect(m.board.squares[0][0]).toBe("E")
test('Home', async () => {
    let m:Model = new Model(0)     // start with first configuration
    let config = [ ['E', 'L', 'W', 'Y', 'C'],
                   ['Y', 'L', 'O', 'A', 'N'],
                   ['U', 'B', 'L', 'E', 'E'],
                   ['E', 'L', 'P', 'M', 'V'],
                   ['P', 'U', 'R', 'A', 'U']]
    for (let r:number = 0; r < 5; r++) {
        for (let c:number = 0; c < 5; c++) {
            expect(m.contents(r, c)).toBe(config[r][c])
        }   
    }

}
)