import { expect, test , describe , it } from 'vitest'
import { sum } from './sum'
describe('premiers tests', () => {
  test('1+1=2', () => { expect(1+1).toBe(2) });
  it('2+2=4', () => { expect(2+2).toBe(4) });
  it( "sum(1,2)==3" ,()=> { expect(sum(1, 2)).toBe(3) } );
});

//à lancer via 
// vitest src/app/basic/calculatrice/basicVitest.spec.ts