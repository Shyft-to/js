import 'dotenv/config';
import { ShyftSdk } from '@/index';
import { Network, WalletKeypair } from '@/types';

const shyft = new ShyftSdk({
  apiKey: process.env.API_KEY as string,
  network: Network.Devnet,
});

describe('Semi custodial wallet test', () => {
  it('create semi-custodial wallet', async () => {
    const wallet = await shyft.semiCustodialWallet.create({
      password: 'XtbTyK@1',
    });
    console.log(wallet);
    expect(typeof wallet).toBe('string');
  });

  it('get keypair of semi-custodial wallet', async () => {
    const wallet = await shyft.semiCustodialWallet.getKeypair({
      password: 'XtbTyK@1',
      walletAddress: 'CEaeaWTKABRkUdmBXoG4NHgkXMqmLnuVBvEyq3D9zXhT',
    });
    console.log(wallet);
    expect(wallet).toMatchObject<WalletKeypair>({
      publicKey: expect.any(String),
      secretKey: expect.any(String),
    });
  });

  it('change password of semi-custodial wallet', async () => {
    const isPasswordChanged = await shyft.semiCustodialWallet.changePassword({
      currentPassword: 'XtbTyK@1',
      newPassword: 'Xtrakuo_@q2',
      walletAddress: 'CEaeaWTKABRkUdmBXoG4NHgkXMqmLnuVBvEyq3D9zXhT',
    });
    console.log(isPasswordChanged);
    expect(isPasswordChanged).toBe(true);
  });
});
