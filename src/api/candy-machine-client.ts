import { ShyftConfig, CaseConverter } from '@/utils';
import { restApiCall } from '@/utils';
import {
  BulkItemSettings,
  CandyMachineGroup,
  CandyMachineGuard,
  CandyMachineItem,
  CandyMachineProgram,
  CreateCandyMachineResp,
  Creator,
  InsertCandyMachineResp,
  ItemSettings,
  MintCandyMachineResp,
  Network,
  PaginatedNftResponse,
} from '@/types';

export class CandyMachineClient {
  private caseConverter: CaseConverter;
  constructor(private readonly config: ShyftConfig) {
    this.caseConverter = new CaseConverter();
  }

  async readMints(input: {
    network?: Network;
    address: string;
    version: CandyMachineProgram;
  }): Promise<string[]> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        address: input.address,
        version: input.version,
      };
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'candy_machine/nft_addresses',
        params,
      });
      const mints = data.result as string[];
      return mints;
    } catch (error) {
      throw error;
    }
  }

  async readNfts(input: {
    network?: Network;
    address: string;
    version: CandyMachineProgram;
    page?: number;
    size?: number;
  }): Promise<PaginatedNftResponse> {
    try {
      const params = {
        network: input?.network ?? this.config.network,
        address: input.address,
        version: input.version,
      };
      if (input?.page) {
        params['page'] = input.page;
      }
      if (input?.size) {
        params['size'] = input.size;
      }
      const data = await restApiCall(this.config.apiKey, {
        method: 'get',
        url: 'candy_machine/nft_addresses',
        params,
      });
      const response = data.result as PaginatedNftResponse;
      return response;
    } catch (error) {
      throw error;
    }
  }

  async create(input: {
    network?: Network;
    wallet: string;
    feePayer?: string;
    symbol: string;
    maxSupply?: number;
    royalty?: number;
    itemsAvailable: number;
    amount?: number;
    collection: string;
    bulkItemSettings?: BulkItemSettings;
    itemSettings?: ItemSettings;
    creators?: Omit<Creator, 'verified'>[];
    guards?: CandyMachineGuard;
    groups?: CandyMachineGroup[];
  }): Promise<CreateCandyMachineResp> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        wallet: input.wallet,
        symbol: input.symbol,
        items_available: input.itemsAvailable,
        collection: input.collection,
      };
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.maxSupply) {
        reqBody['max_supply'] = input.maxSupply;
      }
      if (input?.royalty) {
        reqBody['royalty'] = input.royalty;
      }
      if (input?.amount) {
        reqBody['amount'] = input.amount;
      }
      if (input?.bulkItemSettings) {
        reqBody['bulk_item_settings'] = input.bulkItemSettings;
      }
      if (input?.itemSettings) {
        reqBody['item_settings'] = this.caseConverter.convertToSnakeCaseObject(
          input.itemSettings
        );
      }
      if (input?.creators) {
        reqBody['creators'] = input.creators;
      }
      if (input?.creators) {
        reqBody['creators'] = input.creators;
      }
      if (input?.guards) {
        reqBody['guards'] = input.guards;
      }
      if (input?.groups) {
        reqBody['groups'] = input.groups;
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'candy_machine/create',
        data: reqBody,
      });

      const candyMachineAndTx = response.result as CreateCandyMachineResp;
      return candyMachineAndTx;
    } catch (error) {
      throw error;
    }
  }

  async insert(input: {
    network?: Network;
    wallet: string;
    candyMachine: string;
    index?: number;
    items: CandyMachineItem[];
  }): Promise<InsertCandyMachineResp> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        wallet: input.wallet,
        candy_machine: input.candyMachine,
        items: input.items,
      };
      if (input?.index) {
        reqBody['index'] = input.index;
      }
      if (input.items.length === 0) {
        throw new Error('Atleast insert one item!');
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'candy_machine/insert',
        data: reqBody,
      });

      const candyMachineAndTx = response.result as InsertCandyMachineResp;
      return candyMachineAndTx;
    } catch (error) {
      throw error;
    }
  }

  async mint(input: {
    network?: Network;
    wallet: string;
    candyMachine: string;
    authority: string;
    mintGroup?: string;
    feePayer?: string;
    guardSettings?: Partial<CandyMachineGuard>;
  }): Promise<MintCandyMachineResp> {
    try {
      const reqBody = {
        network: input?.network ?? this.config.network,
        wallet: input.wallet,
        candy_machine: input.candyMachine,
        authority: input.authority,
      };
      if (input?.mintGroup) {
        reqBody['mint_group'] = input.mintGroup;
      }
      if (input?.feePayer) {
        reqBody['fee_payer'] = input.feePayer;
      }
      if (input?.guardSettings) {
        reqBody['guard_settings'] = input.guardSettings;
      }

      const response = await restApiCall(this.config.apiKey, {
        method: 'post',
        url: 'candy_machine/mint',
        data: reqBody,
      });

      const mintAndTx = response.result as MintCandyMachineResp;
      return mintAndTx;
    } catch (error) {
      throw error;
    }
  }
}
