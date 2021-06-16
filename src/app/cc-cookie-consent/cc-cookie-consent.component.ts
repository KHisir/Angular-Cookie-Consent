import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CookieOption } from './model/cookieOption';
import { CookieAgent } from './model/cookieStorage/cookieAgent';
import { CookieKey } from './model/cookieStorage/cookieKeys';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-cc-cookie-consent',
  templateUrl: './cc-cookie-consent.component.html',
  styleUrls: ['./cc-cookie-consent.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        style({ opacity: 0 }), // style only for transition transition (after transiton it removes)
        animate(1000, style({ opacity: 1 })) // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 })) // the new state of the transition(after transiton it removes)
      ])
    ])
  ]
})
export class CcCookieConsentComponent implements OnInit {

  private cookieAccepted: boolean;
  public get CookieAccepted(): boolean {
    return this.cookieAccepted;
  }
  public set CookieAccepted(value: boolean) {
    this.cookieAccepted = value;
    CookieAgent.setCookie(CookieKey.CookieAccepted, this.cookieAccepted);
  }

  constructor() {
    this.cookieAccepted = JSON.parse(CookieAgent.getCookie(CookieKey.CookieAccepted));
  }

  @Input() description = 'This website uses cookies to ensure you get the best experience on our website';

  @Input() options: CookieOption[] = [];

  @Output() result = new EventEmitter<boolean | CookieOption[]>();

  ngOnInit(): void {}

  selectAll(): void {
    this.options.forEach(
      opt => (opt.Checked = true)
    );

    setTimeout(() => {
      this.accepOptions();
    }, 500);
  }

  accepOptions(): void {
    this.CookieAccepted = true;
    this.result.emit(this.options);
  }

  accept(): void {
    this.CookieAccepted = true;
    this.result.emit(this.CookieAccepted);
  }

  refuse(): void {
    this.CookieAccepted = false;
    this.result.emit(this.CookieAccepted);
  }
}
