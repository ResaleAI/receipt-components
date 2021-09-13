import { ReceiptComponent } from '../types';
import AlignComponent from './align';
import BoldComponent from './bold';
import BreakComponent from './break';
import FontComponent from './font';
import ScaleComponent from './scale';
import SmoothComponent from './smooth';

export const globals: { [name: string]: ReceiptComponent } = {
  AlignComponent,
  BoldComponent,
  BreakComponent,
  FontComponent,
  ScaleComponent,
  SmoothComponent,
};

export default globals;
