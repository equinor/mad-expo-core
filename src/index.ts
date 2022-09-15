import {
  Button,
  Checkbox,
  NavigationList,
  SimpleInfoItem,
  Spinner,
  TextLink,
  Typography,
  ServiceMessage,
} from './components/common';
import {
  authenticateSilently,
  getAccount,
  logout,
  msalInit,
  msalLogin,
} from './services/auth';

import AppContainer from './components/common/molecules/AppContainer';
import Banner from './components/common/molecules/Banner';
import DetailsTable from './components/common/molecules/DetailsTable';
import FeedbackScreen from './screens/FeedbackScreen';
import IconButton from './components/common/atoms/IconButton';
import LoginButton from './components/authentication/LoginButton';
import LoginScreen from './screens/LoginScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import Radiobutton from './components/common/atoms/Radiobutton';
import SettingsButton from './components/common/molecules/SettingsButton';
import SettingsScreen from './screens/SettingsScreen';
import {
  appInsightsInit,
  track,
  trackLongTerm,
  trackNavigation,
} from './services/appInsights';
import BaseApiService from './services/BaseAPIServices';
import { obfuscateUser, ObfuscatedUser } from './services/encrypt';

export {
  obfuscateUser,
  ObfuscatedUser,
  BaseApiService,
  appInsightsInit,
  track,
  trackLongTerm,
  trackNavigation,
  AppContainer,
  Button,
  Checkbox,
  IconButton,
  Radiobutton,
  SimpleInfoItem,
  Spinner,
  Typography,
  TextLink,
  Banner,
  ServiceMessage,
  DetailsTable,
  NavigationList,
  SettingsButton,
  LoginButton,
  FeedbackScreen,
  LoginScreen,
  OnBoardingScreen,
  SettingsScreen,
  msalInit,
  msalLogin,
  authenticateSilently,
  logout,
  getAccount,
};
