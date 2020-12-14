import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faFolder, faFolderOpen, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class MyFontAwesomeModule {

  constructor(library: FaIconLibrary) {
    // Add an icons to the library for convenient access in other components
    library.addIcons(
      faFolder,
      faFolderOpen,
      faQuestionCircle,
      faUserCircle
    );
  }

}
