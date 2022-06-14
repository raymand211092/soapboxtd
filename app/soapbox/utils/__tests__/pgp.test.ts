import { isPgpMessage } from '../pgp';

describe('isPgpMessage()', () => {
  it('rejects a non-PGP message', () => {
    expect(isPgpMessage('abcdefg-----BEGIN PGP')).toBe(false);
  });

  it('identifies a PGP public key', () => {
    const message = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=LtJq
-----END PGP PUBLIC KEY BLOCK-----`;

    expect(isPgpMessage(message)).toBe(true);
  });
});
