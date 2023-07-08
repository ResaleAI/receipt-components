import endOptimizer from './endOptimizer';
import { optimizeEscPos, registerOptimization } from './optimizer';
import patternOptimizer, { registerPattern } from './patternOptimizer';

registerOptimization(patternOptimizer);
registerOptimization(endOptimizer);

export { registerOptimization, registerPattern };
export default optimizeEscPos;
