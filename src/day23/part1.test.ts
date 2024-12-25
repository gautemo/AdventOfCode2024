import { assertEquals } from '@std/assert'
import { part1 } from './main.ts'

Deno.test('7 sets of three inter-connected T computers', () => {
  const input = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`.trim()
  assertEquals(part1(input), 7)
})
