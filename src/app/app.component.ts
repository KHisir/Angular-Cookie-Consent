import { Component } from '@angular/core';
import { CookieOption } from './cc-cookie-consent/model/cookieOption';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cc-cookie-consent';

  // Demo:
  description = 'We want to offer you the best possible service. Please choose which cookies you want to use. You can find details in our <a href="">privacy policy.</a>';
  cookieOptions: CookieOption[] = [
    new CookieOption('Only necessary', true, 'Required functionalities'),
    new CookieOption('Usage analysis', false, 'Statistics'),
    new CookieOption('Marketing', false, 'Personalization'),
  ];

  onApply(res: boolean | CookieOption[]): void {
    console.log(res);
  }
}
