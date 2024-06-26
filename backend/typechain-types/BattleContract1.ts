/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export declare namespace BattleContract1 {
  export type FightRecordStruct = {
    challenger: string;
    champion: string;
    result: string;
    date: string;
  };

  export type FightRecordStructOutput = [
    challenger: string,
    champion: string,
    result: string,
    date: string
  ] & {
    challenger: string;
    champion: string;
    result: string;
    date: string;
  };
}

export interface BattleContract1Interface extends Interface {
  getFunction(
    nameOrSignature:
      | "battle_master_champion_id"
      | "challengeBattlemaster"
      | "challengerMap"
      | "championMap"
      | "getChallenger"
      | "registerAsChallenger"
      | "setChallengerChampionId"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "ChallengerChampionIdUpdated"
      | "ChallengerFightHistoryCleared"
      | "ChallengerRegistered"
      | "FightResultUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "battle_master_champion_id",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "challengeBattlemaster",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "challengerMap",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "championMap",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getChallenger",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerAsChallenger",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setChallengerChampionId",
    values: [AddressLike, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "battle_master_champion_id",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "challengeBattlemaster",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "challengerMap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "championMap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChallenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerAsChallenger",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setChallengerChampionId",
    data: BytesLike
  ): Result;
}

export namespace ChallengerChampionIdUpdatedEvent {
  export type InputTuple = [challenger: AddressLike, championId: BigNumberish];
  export type OutputTuple = [challenger: string, championId: bigint];
  export interface OutputObject {
    challenger: string;
    championId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChallengerFightHistoryClearedEvent {
  export type InputTuple = [challenger: AddressLike];
  export type OutputTuple = [challenger: string];
  export interface OutputObject {
    challenger: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace ChallengerRegisteredEvent {
  export type InputTuple = [challenger: AddressLike, championId: BigNumberish];
  export type OutputTuple = [challenger: string, championId: bigint];
  export interface OutputObject {
    challenger: string;
    championId: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace FightResultUpdatedEvent {
  export type InputTuple = [
    challenger: AddressLike,
    fightTimestamp: BigNumberish,
    didChallengerWin: boolean,
    battlemasterChampion: string,
    challengerChampion: string
  ];
  export type OutputTuple = [
    challenger: string,
    fightTimestamp: bigint,
    didChallengerWin: boolean,
    battlemasterChampion: string,
    challengerChampion: string
  ];
  export interface OutputObject {
    challenger: string;
    fightTimestamp: bigint;
    didChallengerWin: boolean;
    battlemasterChampion: string;
    challengerChampion: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface BattleContract1 extends BaseContract {
  connect(runner?: ContractRunner | null): BattleContract1;
  waitForDeployment(): Promise<this>;

  interface: BattleContract1Interface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  battle_master_champion_id: TypedContractMethod<[], [bigint], "view">;

  challengeBattlemaster: TypedContractMethod<[], [void], "nonpayable">;

  challengerMap: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  championMap: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, string] & {
        name: string;
        strength: bigint;
        hidden: boolean;
        ipfsHash: string;
      }
    ],
    "view"
  >;

  getChallenger: TypedContractMethod<
    [_challenger: AddressLike],
    [[bigint, BattleContract1.FightRecordStructOutput[]]],
    "view"
  >;

  registerAsChallenger: TypedContractMethod<
    [_championId: BigNumberish],
    [void],
    "nonpayable"
  >;

  setChallengerChampionId: TypedContractMethod<
    [_challenger: AddressLike, _championId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "battle_master_champion_id"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "challengeBattlemaster"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "challengerMap"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "championMap"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, boolean, string] & {
        name: string;
        strength: bigint;
        hidden: boolean;
        ipfsHash: string;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "getChallenger"
  ): TypedContractMethod<
    [_challenger: AddressLike],
    [[bigint, BattleContract1.FightRecordStructOutput[]]],
    "view"
  >;
  getFunction(
    nameOrSignature: "registerAsChallenger"
  ): TypedContractMethod<[_championId: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setChallengerChampionId"
  ): TypedContractMethod<
    [_challenger: AddressLike, _championId: BigNumberish],
    [void],
    "nonpayable"
  >;

  getEvent(
    key: "ChallengerChampionIdUpdated"
  ): TypedContractEvent<
    ChallengerChampionIdUpdatedEvent.InputTuple,
    ChallengerChampionIdUpdatedEvent.OutputTuple,
    ChallengerChampionIdUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "ChallengerFightHistoryCleared"
  ): TypedContractEvent<
    ChallengerFightHistoryClearedEvent.InputTuple,
    ChallengerFightHistoryClearedEvent.OutputTuple,
    ChallengerFightHistoryClearedEvent.OutputObject
  >;
  getEvent(
    key: "ChallengerRegistered"
  ): TypedContractEvent<
    ChallengerRegisteredEvent.InputTuple,
    ChallengerRegisteredEvent.OutputTuple,
    ChallengerRegisteredEvent.OutputObject
  >;
  getEvent(
    key: "FightResultUpdated"
  ): TypedContractEvent<
    FightResultUpdatedEvent.InputTuple,
    FightResultUpdatedEvent.OutputTuple,
    FightResultUpdatedEvent.OutputObject
  >;

  filters: {
    "ChallengerChampionIdUpdated(address,uint256)": TypedContractEvent<
      ChallengerChampionIdUpdatedEvent.InputTuple,
      ChallengerChampionIdUpdatedEvent.OutputTuple,
      ChallengerChampionIdUpdatedEvent.OutputObject
    >;
    ChallengerChampionIdUpdated: TypedContractEvent<
      ChallengerChampionIdUpdatedEvent.InputTuple,
      ChallengerChampionIdUpdatedEvent.OutputTuple,
      ChallengerChampionIdUpdatedEvent.OutputObject
    >;

    "ChallengerFightHistoryCleared(address)": TypedContractEvent<
      ChallengerFightHistoryClearedEvent.InputTuple,
      ChallengerFightHistoryClearedEvent.OutputTuple,
      ChallengerFightHistoryClearedEvent.OutputObject
    >;
    ChallengerFightHistoryCleared: TypedContractEvent<
      ChallengerFightHistoryClearedEvent.InputTuple,
      ChallengerFightHistoryClearedEvent.OutputTuple,
      ChallengerFightHistoryClearedEvent.OutputObject
    >;

    "ChallengerRegistered(address,uint256)": TypedContractEvent<
      ChallengerRegisteredEvent.InputTuple,
      ChallengerRegisteredEvent.OutputTuple,
      ChallengerRegisteredEvent.OutputObject
    >;
    ChallengerRegistered: TypedContractEvent<
      ChallengerRegisteredEvent.InputTuple,
      ChallengerRegisteredEvent.OutputTuple,
      ChallengerRegisteredEvent.OutputObject
    >;

    "FightResultUpdated(address,uint256,bool,string,string)": TypedContractEvent<
      FightResultUpdatedEvent.InputTuple,
      FightResultUpdatedEvent.OutputTuple,
      FightResultUpdatedEvent.OutputObject
    >;
    FightResultUpdated: TypedContractEvent<
      FightResultUpdatedEvent.InputTuple,
      FightResultUpdatedEvent.OutputTuple,
      FightResultUpdatedEvent.OutputObject
    >;
  };
}
