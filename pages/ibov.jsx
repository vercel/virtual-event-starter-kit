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
import {GetServerSideProps, GetStaticProps} from 'next';
import IbovImage from '@components/ibov';


export default function IbovOnlyPage(data) {
  return <IbovImage ibovData={data}/>;
}

export const getServerSideProps = async () => {
    const uri = "https://statusinvest.com.br/acao/getaltabaixa?IndiceCode=ibovespa";
    // const uri = "https://statusinvest.com.br/stock/getaltabaixa?IndiceCode=sp-500";
    const res = await fetch(uri);
    const data = await res.json();
    // console.log(data);

    return {
        props: {
            data
        } // will be passed to the page component as props
    };
};
