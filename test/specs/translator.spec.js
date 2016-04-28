import { translate } from '../../src/translator'

var locales = {
  langA: {
    a: 'foo',
    b: { c: 'bar' }
  },
  langB: {
    a: 'baz'
  }
}

describe('translate', () => {
  it('returns the existed entry', () => {
    translate(locales, 'langA', 'a').should.equal('foo')
    translate(locales, 'langA', 'b.c').should.equal('bar')
    translate(locales, 'langB', 'a').should.equal('baz')
  })

  it('returns undefined, if the locales is empty', () => {
    expect(translate({}, 'langA', 'a')).to.not.exist
    expect(translate(null, 'langA', 'a')).to.not.exist
  })

  it('returns undefined, if the path does not exits', () => {
    expect(translate(locales, 'langA', 'b.c.d')).to.not.exist
  })
})
