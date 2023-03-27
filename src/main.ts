import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import {defineCustomElements} from "animated-banner/loader";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))

void defineCustomElements(window)
