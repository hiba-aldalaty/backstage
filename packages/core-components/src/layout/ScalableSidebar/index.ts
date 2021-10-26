/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export {
  Sidebar as ScalableSidebar,
  SidebarExpandButton as ScalableSidebarExpandButton,
} from './Bar';
export { SubmenuItem } from './SubmenuItem';
export type { SidebarClassKey as ScalableSidebarClassKey } from './Bar';
export {
  SidebarDivider as ScalableSidebarDivider,
  SidebarItem as ScalableSidebarItem,
  SidebarSearchField as ScalableSidebarSearchField,
  SidebarSpace as ScalableSidebarSpace,
  SidebarSpacer as ScalableSidebarSpacer,
  SidebarScrollWrapper as ScalableSidebarScrollWrapper,
} from './Items';
export type { SidebarItemClassKey as ScalableSidebarItemClassKey } from './Items';
export {
  IntroCard as ScalableSidebarIntroCard,
  SidebarIntro as ScalableSidebarIntro,
} from './Intro';
export type { SidebarIntroClassKey as ScalableSidebarIntroClassKey } from './Intro';
export {
  SIDEBAR_INTRO_LOCAL_STORAGE as SCALABLE_SIDEBAR_INTRO_LOCAL_STORAGE,
  SidebarContext as ScalableSidebarContext,
  sidebarConfig as scalableSidebarConfig,
} from './config';
export type { SidebarContextType as ScalableSidebarContextType } from './config';
