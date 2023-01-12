import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
export type ViewportValue = 'mobile' | 'desktop';
export let viewport$!: BehaviorSubject<ViewportValue>;

@Injectable({
  providedIn: 'root'
})
export class ViewportService {
  private readonly _breakpoint: number = 1024;
  private _change!: boolean;
  private _value!: ViewportValue;
  set value(width: number) {
    this._value = (width <= this._breakpoint) ? 'mobile' : 'desktop';
  }

  constructor() {
    this.value = window.innerWidth;
    viewport$ = new BehaviorSubject(this._value);
  }

  public init(): void {
    window.addEventListener('resize', () => {
      if (this._value == 'mobile') {
        this._change = window.innerWidth > this._breakpoint;
      } else if (this._value == 'desktop') {
        this._change = window.innerWidth < this._breakpoint;
      }
      if (!this._change) {
        return;
      }
      this.value = window.innerWidth;
      viewport$.next(this._value);
      this._change = false;
    });
  }
}
