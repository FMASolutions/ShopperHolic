import { LandingPage } from './landingPage';
import { ItemDetailed } from '../stock/items/itemDetailed';

export class LandingPageWithItems{
    pageInfo: LandingPage = new LandingPage();
    featuredItems: ItemDetailed[] = []; 
}