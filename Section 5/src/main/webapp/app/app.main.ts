import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { JHipsterTasksAppAppModule } from './app.module';

ProdConfig();

if (module['hot']) {
    module['hot'].accept();
}

platformBrowserDynamic().bootstrapModule(JHipsterTasksAppAppModule)
.then((success) => console.log(`Application started`))
.catch((err) => console.error(err));
