import { span } from '../helpers';
import { links } from '../links';
import lower from '/src/assets/img/our-adventage/lower-cost.svg?url';
import endToEnd from '/src/assets/img/our-adventage/end-to-end.svg?url';
import built from '/src/assets/img/our-adventage/built.svg?url';
import flexible from '/src/assets/img/our-adventage/flexible.svg?url';
import clear from '/src/assets/img/our-adventage/clear.svg?url';
import docs from '/src/assets/img/community/docs.svg?url';
import forum from '/src/assets/img/community/forum.svg?url';
import document from '/src/assets/img/community/document.svg?url';

import m11 from '/src/assets/img/news/m11.png?url';
import opt from '/src/assets/img/news/opt.png?url';
import bastion from '/src/assets/img/news/bastion.png?url';

import falconx from '/src/assets/img/hero/falconx.png?url';
import falconxBg from '/src/assets/img/hero/falconxBg.svg?raw';

import fasanra from '/src/assets/img/hero/fasanara.png?url';
import fasanraBg from '/src/assets/img/hero/fasanaraBg.svg?raw';

import bastionIcon from '/src/assets/img/hero/bastion.png?url';
import bastionBg from '/src/assets/img/hero/bastionBg.svg?raw';


import borrow from '/src/assets/img/solution/borrow.svg?url';
import lend from '/src/assets/img/solution/lend.svg?url';
import curate from '/src/assets/img/solution/curate.svg?url';

import Sherlock from '/src/assets/img/transparent/sherlock.svg?url';
import Code from '/src/assets/img/transparent/code.svg?url';
import Diligence from '/src/assets/img/transparent/diligence.svg?url';
import imm from '/src/assets/img/transparent/imm.svg?url';


export const HomeEnCopy = {
    heroSection: {
        title: 'Radically transforming credit, on-chain',
        // description: 'Building a marketplace of scaled on-chain credit facilities that displace legacy lending infrastructure and loan origination processes at each stage of the loan lifecycle.',
        description: 'Building a private credit marketplace that connects institutional lenders and borrowers, offering scalable yield opportunities',
        infoBlocks: [
            {
                id: 'TVL',
                title: 'TVL',
                value: '$-',
            },
            {
                id: 'CE',
                title: 'CREDIT EXTENDED',
                value: '$-',
            },
        ],
        tabs: [
            {
                icon: fasanra,
                title: 'Fasanara Digital',
                description: 'Basis Trade',
                bgImage: fasanraBg,
                badges: ['USDС', 'Variable rate'],
                address: '0x45054c6753b4Bce40C5d54418DabC20b070F85bE',
                itemDescription: 'Variable-rate loan channeling funds into delta-neutral yield strategies overperforming the BTC funding rate.',
                infoBlock: [
                    {
                        id: 'TVL',
                        title: 'TVL',
                        value: '$-',
                    },
                    {
                        id: 'APY',
                        title: 'Net APY',
                        value: '-%',
                    },
                    {
                        id: 'RED',
                        title: 'Redemptions',
                        value: 'Weekly',
                    },
                ],
                isActive: false,
            },
            {
                icon: falconx,
                title: 'FalconX',
                description: 'Prime Brokerage',
                bgImage: falconxBg,
                badges: ['USDС', 'Fixed rate'],
                address: '0x24e16F9Fad32891f8bA69cE8fEdd273A2649331A',
                itemDescription: 'Lending funds to an SPV managed by a top-tier Prime Broker, providing financing to end-counterparties while being secured by structural protections.',
                infoBlock: [
                    {
                        id: 'TVL',
                        title: 'TVL',
                        value: '$-',
                    },
                    {
                        title: 'Net APY',
                        value: 'Hidden',
                    },
                    {
                        id: 'RED',
                        title: 'Redemptions',
                        value: 'Monthly',
                    },
                ],
                isActive: true,
            },
            {
                icon: bastionIcon,
                title: 'Bastion Trading',
                description: 'Market Making',
                bgImage: bastionBg,
                badges: ['USDT', 'Fixed rate'],
                address: '0xaE65d6C295E4a28519182a632FB25b7C1966AED7',
                itemDescription: 'Fixed rate loan channeling funds into derivatives trading and market-making strategies.',
                infoBlock: [
                    {
                        id: 'TVL',
                        title: 'TVL',
                        value: '$-',
                    },
                    {
                        id: 'APY',
                        title: 'Net APY',
                        value: '-%',
                    },
                    {
                        id: 'RED',
                        title: 'Redemptions',
                        value: 'Monthly',
                    },
                ],
                isActive: false,
            },
        ],
    },
    solutionSection: {
        subTitle: 'MODULAR SOLUTIONS',
        title: 'Onchain Credit, Simplified.',
        // description: 'Built for asset managers, credit funds, and institutional investors, Pareto delivers programmable, transparent, and efficient on-chain capital markets with institutional-grade infrastructure.',
        description: 'Built for asset managers, credit funds, and institutional investors, Pareto delivers programmable, transparent, and efficient on-chain capital solutions with institutional-grade infrastructure.',
        solutionList: [
            {
                className: 'lend',
                title: 'Lend',
                description: 'Expand your fixed-income portfolio with structured yield strategies tailored to diverse risk profiles. Self-onboard seamlessly via privacy-preserving, compliant KYC, so you can focus on optimizing returns.',
                visual: lend,
                btns: [
                    {
                        text: 'Enter App',
                        link: 'https://app.pareto.credit',
                    },
                    {
                        isAnchor: true,
                        text: 'Contact Us',
                        parentId: 'lender',
                        className: 'contact-us-btn',
                        link: 'homepage-get-in-touch',
                    },
                ],
                futures: [
                    {
                        title: 'Choose Credit Vault',
                        description: 'Each market is uniquely structured based on borrower profiles, supported assets, blockchain networks, and loan terms.',
                    },
                    {
                        title: 'Complete  KYC',
                        description: 'Access eligibility is verified through zk-proofed KYC, ensuring institutional compliance and privacy.',
                    },
                    {
                        title: 'Execute Loan Agreement',
                        description: 'Formalize credit terms by signing a legally binding agreement that outlines borrower obligations and lender rights.',
                    },
                    {
                        title: 'Deploy Assets',
                        description: 'Allocate assets to credit vaults, receive interest-bearing credit tokens in return, and use them across DeFi.',
                    },
                ],
            }, {
                className: 'borrow',
                title: 'Borrow',
                description: 'Streamline the creation and securitization of your credit – interest rates, lockup periods, withdrawal cycles, reserve ratios, risk-adjusted tranches: construct the credit line that works best for you.',
                visual: borrow,
                btns: [{
                    isAnchor: true,
                    text: 'Contact Us',
                    parentId: 'borrower',
                    className: 'contact-us-btn',
                    link: 'homepage-get-in-touch',
                },
                ],
                futures: [
                    {
                        title: 'Get Onboarded',
                        description: 'Prospective borrowers undergo a due diligence process before gaining access to a credit vault.',
                    },
                    {
                        title: 'Configure Vault',
                        description: 'Borrowers set key parameters like loan duration, interest rate model, early exit terms, tranche structure, preferred KYC processes, and utilize an available legal framework.',
                    },
                    {
                        title: 'Receive Funds',
                        description: 'Once a loan cycle commences, borrowers receive funds directly into their designated wallet.',
                    },
                    {
                        title: 'Distribute Interest',
                        description: 'Credit Vaults automate accounting. Borrowers must pay interest at the end of each cycle; unclaimed interest returns to the lending pool.',
                    },
                ],
            },
            {
                className: 'curate',
                title: 'Curate',
                description: 'Leverage your underwriting expertise on-chain to enhance capital efficiency, mitigate counterparty risk, and elevate market transparency with institutional-grade credit structuring.',
                visual: curate,
                btns: [
                    {
                        isAnchor: true,
                        text: 'Contact Us',
                        parentId: 'curator',
                        className: 'contact-us-btn',
                        link: 'homepage-get-in-touch',
                    },
                ],
                futures: [
                    {
                        title: 'Get Onboarded',
                        description: 'Curators undergo a comprehensive due diligence process before being authorized to manage a Credit Vault.',
                    },
                    {
                        title: 'Configure Vault',
                        description: 'Curators can set vault fees and earn from their curatorship.',
                    },
                    {
                        title: 'Access Curator App',
                        description: 'Curators have access to a dedicated application that provides real-time visibility into fund inflows and outflows.',
                    },
                    {
                        title: 'Oversee Vault Performance',
                        description: 'Curators oversee the generation and distribution of reports on vault performance and risk exposures.',
                    },
                ],
            },
        ],
    },
    HowItWorks: {
        subTitle: 'HOW IT WORKS',
        title: 'Where Roles Create Value',
    },
    OurAdvantage: {
        subTitle: 'OUR ADVANTAGE',
        title: 'Purpose-Built for Institutions',
        description: 'Experience institutional-grade on-chain credit with Pareto.',
        list: [
            {
                icon: lower,
                title: 'Lower cost of capital',
                desc: 'A decentralized infrastructure that compresses the costs of traditional off-chain securitization and uses open-source services to reduce the intermediary costs and complexity of TradFi.',
            },
            {
                icon: endToEnd,
                title: 'End-to-end transparency',
                desc: 'End-to-end transparency as the entire capital structure, securitization, and servicing of debt facilities is brought onchain — multi-tranching, NAV, credit tokenization, securitization, reporting, and more.',
            },
            {
                icon: built,
                title: 'Built for DeFi',
                desc: 'Designed from the ground-up by a DeFi-native team to work seamlessly with DeFi protocols in a compliant way. Tokens can be used as collateral, in settlement transactions, or for on-chain finance.',
            },
            {
                icon: flexible,
                title: 'Flexible ownership',
                desc: 'Credit Vaults integrate easily with the existing workflows and custody solutions, whether you manage a crypto native fund, a DAO, or a traditional fund.',
            },
            {
                icon: clear,
                title: 'Clear regulatory structure',
                desc: 'Credit Vaults operate within a simple regulatory framework so you can focus on utility and yield. Assets are segregated by established providers and available to Qualified Investors in supported jurisdictions.',
            },
        ],
    },
    Transparent: {
        subTitle: 'Transparent & Secure',
        title: 'Audited by industry-leading security firms.',
        leftBlock: {
            title: 'Transparency',
            description: 'Pareto offers real-time transaction monitoring, on-chain verified contracts, and the source code is publicly accessible and verifiable.',
            btns: [{
                text: 'EXPLORE SECURITY',
                link: 'https://docs.pareto.credit/developers/security',
            },
            ],
        },
        rightBlock: {
            title: 'Audits',
            btn: {
                text: 'READ REPORTS',
                link: 'https://docs.pareto.credit/developers/security/audits',
            },
            logos: [{
                src: Sherlock,
                alt: 'sherlock',
            },
            {
                src: Code,
                alt: 'code',
            },
            {
                src: Diligence,
                alt: 'diligence',
            }],
        },
        bottomBlock: {
            title: 'Bug Bounty Program',
            logo: imm,
            count: '$50,000',
            description: 'Earn rewards for reporting vulnerabilities and keeping the protocol secure.',
        },
    },
    Ecosystem: {
        subTitle: 'ECOSYSTEM',
        title: 'Our partners',
        description: 'Collaborating with leading traditional and digital asset investment institutions dedicated to driving the adoption of tokenization in traditional finance and credit markets.',
    },
    GetInTouch: {
        subTitle: 'Get in touch',
        title: 'Ready to get started?',
        description: 'Scale your digital asset business with flexible, cost-effective credit lines.',
    },
    CommunitySection: {
        subTitle: 'Governance & Documentation',
        title: 'Get Involved',
        description: '',
        list: [
            {
                img: forum,
                title: 'Governance Forum',
                description: 'Discuss key issues, propose changes, and help shape Pareto’s future.',
                btn: {
                    text: 'VISIT GOVERNANCE',
                    link: 'https://gov.pareto.credit/',
                },
            },
            {
                img: docs,
                title: 'Developer Docs',
                description: 'Learn how to interact with Pareto\'s smart contracts and integrate them.',
                btn: {
                    text: 'READ DOCS',
                    link: 'https://docs.pareto.credit/',
                },
            },
            {
                img: document,
                title: 'Integrators Docs',
                description: 'Learn how to interact with Pareto\'s API and integrate them.',
                btn: {
                    text: 'READ DOCS',
                    link: 'https://docs.pareto.credit/developers/api',
                },
            },
        ],
    },
    NewsSection: {
        subTitle: 'Media Coverage',
        title: 'News',
        description: 'A collection of news about Pareto and its ecosystem',
        list: [
            {
                img: m11,
                title: 'M11 Credit curates the first Prime Brokerage Credit Vault',
                description: 'Overseeing a fixed-rate pool, channeling funds into prime brokerage activities',
                btn: {
                    text: 'Read more',
                    link: '#',
                },
            },
            {
                img: opt,
                title: 'Credit Vaults Launch on Optimism',
                description: 'Private credit with LP rewards',
                btn: {
                    text: 'Read more',
                    link: '#',
                },
            },
            {
                img: bastion,
                title: 'Bastion Trading: a fixed yield Credit Vault',
                description: 'A fixed-rate pool, channeling funds into derivatives and market-making yield strategies',
                btn: {
                    text: 'Read more',
                    link: '#',
                },
            },
        ],
    },
};
