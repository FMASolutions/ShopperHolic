import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>
    , private viewContainer: ViewContainerRef,
    private authService: AuthService) { }

  @Input() set hasClaim(claimType: any) {
    if (this.authService.hasClaim(claimType)) { this.viewContainer.createEmbeddedView(this.templateRef); }
    else { this.viewContainer.clear(); }
  }

}
