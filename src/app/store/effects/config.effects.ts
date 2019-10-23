
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { IConfig } from '../../models/config.interface';
import { ConfigService } from './../../services/config.service';
import { EConfigActions, GetConfig, GetConfigSuccess } from '../actions/config.actions';

/**
 * Effect responsible for deciding if there any change in the action.
 * switchMap will cancel all the previous request if there and get the latest request response.
 * of returns whatever it takes.
 * ofType returns the observable of action. "For example, if actions has type Actions<AdditionAction|SubstractionAction>, and the type of the Addition action is add, then actions.pipe(ofType('add')) returns an Observable<AdditionAction>".
 *
 */

@Injectable()
export class ConfigEffects {
  @Effect()
  getConfig$ = this._actions$.pipe(
    ofType<GetConfig>(EConfigActions.GetConfig),
    switchMap(() => this._configService.getConfig()),
    switchMap((config: IConfig) => {
      return of(new GetConfigSuccess(config));
    })
  );

  constructor(
    private _configService: ConfigService,
    private _actions$: Actions) {}
}
