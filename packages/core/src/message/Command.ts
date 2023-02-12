import type { IRequest, IRequestData, IRequestDefinition, IRequestMetadata } from './Request';
import type { IUnknownMessageData } from './base/MessageData';


export interface ICommandDefinition extends IRequestDefinition {
  messageType: 'command';
}

export interface ICommandData extends IRequestData {}

export interface ICommandMetadata extends IRequestMetadata {}

/**
 * ICommand
 *
 * The interface for Command messages.
 */
export interface ICommand<
  TData extends ICommandData = IUnknownMessageData,
  TMetadata extends ICommandMetadata = ICommandMetadata,
>
  extends IRequest<TData, TMetadata> { }