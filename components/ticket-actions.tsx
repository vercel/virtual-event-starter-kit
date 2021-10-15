/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState, useRef, useEffect, MouseEvent } from 'react';
import cn from 'classnames';
import { SITE_URL, TWEET_TEXT } from '@lib/constants';
import IconTwitter from './icons/icon-twitter';
import IconLinkedin from './icons/icon-linkedin';
import IconDownload from './icons/icon-download';
import LoadingDots from './loading-dots';
import styleUtils from './utils.module.css';
import styles from './ticket-actions.module.css';
import { ethers } from 'ethers';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import VercelNFT from 'artifacts/contracts/VercelNFT.sol/VercelNFT.json';

type Props = {
  username: string;
};

export default function TicketActions({ username }: Props) {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [imgReady, setImgReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minting, setMinting] = useState(false);
  const downloadLink = useRef<HTMLAnchorElement>();
  const permalink = encodeURIComponent(`${SITE_URL}/tickets/${username}`);
  const text = encodeURIComponent(TWEET_TEXT);
  const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&via=vercel&text=${text}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;
  const downloadUrl = `/api/ticket-images/${username}`;

  const client = ipfsHttpClient({
    url: 'https://ipfs.infura.io:5001/api/v0'
  });

  const requestAccount = async () => {
    if ((window as any).ethereum) {
      const provider = new ethers.providers.Web3Provider((window as any).ethereum, 'any');
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setUserAddress(address);
    } else {
      alert('Please Install MetaMask');
    }
  };

  const createNFT = async (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();
    if (typeof (window as any).ethereum !== 'undefined' && userAddress) {
      // if (imgReady) return;

      downloadLink.current = e.currentTarget;
      // Wait for the image download to finish
      setMinting(true);
      const provider = new ethers.providers.Web3Provider((window as any).ethereum);
      const signer = provider.getSigner();

      const data = JSON.stringify({
        attributes: [],
        description: 'Next Conf 2021',
        external_url: 'https://demo.vercel.events',
        image: `${process.env.NEXT_PUBLIC_SITE_ORIGIN}/api/ticket-images/${username}`,
        name: username
      });

      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;

      const contract = new ethers.Contract(
        '<SMART CONTRACT ADDRESS>', // Pass your deployed smart contract address here
        VercelNFT.abi,
        signer
      );

      const transaction = await contract.createToken(url);
      await transaction.wait();
      setMinting(false);
    }
  };

  useEffect(() => {
    if (!userAddress) {
      requestAccount();
    }
  }, [userAddress]);

  useEffect(() => {
    setImgReady(false);

    const img = new Image();

    img.src = downloadUrl;
    img.onload = () => {
      setImgReady(true);
      setLoading(false);
      if (downloadLink.current) {
        downloadLink.current.click();
        downloadLink.current = undefined;
      }
    };
  }, [downloadUrl]);

  return (
    <>
      <div className={styles['ticket-actions']}>
        <a
          className={cn(styles.button, styleUtils.appear, styles.first, 'icon-button')}
          href={tweetUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconTwitter width={24} /> Tweet it!
        </a>
        <a
          className={cn(
            styles.button,
            styleUtils.appear,
            styles.second,
            'icon-button',
            // LinkedIn Share widget doesn’t work on mobile
            styles['linkedin-button']
          )}
          href={linkedInUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <IconLinkedin width={20} /> Share on LinkedIn
        </a>
        <a
          className={cn(styles.button, styleUtils.appear, styles.third, 'icon-button', {
            [styles.loading]: loading
          })}
          href={loading ? undefined : downloadUrl}
          onClick={e => {
            if (imgReady) return;

            e.preventDefault();
            downloadLink.current = e.currentTarget;
            // Wait for the image download to finish
            setLoading(true);
          }}
          download="ticket.png"
        >
          {loading ? (
            <LoadingDots size={4} />
          ) : (
            <>
              <IconDownload width={24} /> Download
            </>
          )}
        </a>
      </div>
      {typeof (window as any).ethereum !== 'undefined' && (
        <a
          className={cn(
            styles['button-mint'],
            styles.button,
            styleUtils.appear,
            styles.third,
            'icon-button',
            {
              [styles.loading]: minting
            }
          )}
          href={minting ? undefined : downloadUrl}
          onClick={e => createNFT(e)}
          download="ticket.png"
        >
          {minting ? (
            <LoadingDots size={4} />
          ) : (
            <>
              <IconDownload width={24} /> Mint NFT
            </>
          )}
        </a>
      )}
    </>
  );
}
