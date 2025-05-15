import { EthenaClient } from './ethena-client/ethena-client.lib';
import { InstadappClient } from './instadapp-client/instadapp-client.lib';
import { LidoClient } from './lido-client/lido-client';
import { UsualClient } from './usual-client/usual-client.lib';
export class IntegrationClient {
    async getApr(tokenSymbol) {
        return this.client.getApr(tokenSymbol);
    }
    constructor(provider){
        switch(provider){
            case 'Usual':
                this.client = new UsualClient();
                break;
            case 'Lido':
                this.client = new LidoClient();
                break;
            case 'Instadapp':
                this.client = new InstadappClient();
                break;
            case 'Ethena':
                this.client = new EthenaClient();
                break;
            default:
                throw Error(`Integration Error: wrong provider "${provider}"`);
        }
    }
}

//# sourceMappingURL=integrations-client.lib.js.map