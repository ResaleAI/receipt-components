import { registerPattern, endOptimizer, patternOptimizer } from './optimizers';
import { optimizeEscPos, registerOptimization } from './optimizer';

registerOptimization(patternOptimizer);
registerOptimization(endOptimizer);

export { registerOptimization, registerPattern };
export default optimizeEscPos;
