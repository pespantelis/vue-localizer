import { translate } from '../../src/translator'

var locales = {
  langA: {
    a: 'foo',
    b: { c: 'bar' }
  },
  langB: {
    a: 'baz'
  },
  langC: {
    a: 'foo {0} baz {1}',
    b: 'foo {a} baz {b}'
  }
}

describe('search', () => {
  it('returns the existed entry', () => {
    translate(locales, 'langA', 'a').should.equal('foo')
    translate(locales, 'langA', 'b.c').should.equal('bar')
    translate(locales, 'langB', 'a').should.equal('baz')
  })

  it('returns undefined, if the locales is empty', () => {
    expect(translate({}, 'langA', 'a')).to.not.exist
    expect(translate(null, 'langA', 'a')).to.not.exist
  })

  it('returns undefined, if the path does not exist', () => {
    expect(translate(locales, 'langA', 'b.c.d')).to.not.exist
  })

  it('returns undefined, if the path is an object', () => {
    expect(translate(locales, 'langA', 'b')).to.not.exist
  })
})

describe('replace', () => {
  it('returns the entry, if there is not replacements', () => {
    translate(locales, 'langA', 'a').should.equal('foo')
  })

  it('replaces with list params', () => {
    translate(locales, 'langC', 'a', [0,1]).should.equal('foo 0 baz 1')
    translate(locales, 'langC', 'a', ['bar','qux']).should.equal('foo bar baz qux')
    translate(locales, 'langC', 'a', ['bar']).should.equal('foo bar baz {1}')
  })

  it('replaces with named params', () => {
    translate(locales, 'langC', 'b', {a:0,b:1}).should.equal('foo 0 baz 1')
    translate(locales, 'langC', 'b', {a:'bar',b:'qux'}).should.equal('foo bar baz qux')
    translate(locales, 'langC', 'b', {b:'bar',a:'qux'}).should.equal('foo qux baz bar')
    translate(locales, 'langC', 'b', {c:'bar',b:'qux'}).should.equal('foo {a} baz qux')
    translate(locales, 'langC', 'b', {b:'bar'}).should.equal('foo {a} baz bar')
  })
})
