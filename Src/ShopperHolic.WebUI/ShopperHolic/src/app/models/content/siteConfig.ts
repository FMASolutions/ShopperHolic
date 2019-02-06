import { BasicSiteConfig } from './basicSiteConfig';
import { LandingPageWithItems } from './landingPageWithItems';
import { AboutPage } from './aboutPage';
import { ContactPage } from './contactPage';

export class SiteConfig{
    appConfig: BasicSiteConfig = new BasicSiteConfig();
    landingPage: LandingPageWithItems = new LandingPageWithItems();
    aboutPage: AboutPage = new AboutPage();
    contactPage: ContactPage = new ContactPage();
}